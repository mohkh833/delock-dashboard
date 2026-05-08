'use client'

import EmployeeCard from './EmployeeCard'
import EmployeeCardSkeleton from './EmployeeCardSkeleton'
import BulkActionBar from './BulkActionBar'
import Pagination from '@/components/ui/Pagination'
import Select from '@/components/ui/Select'
import EmptyState from '@/components/shared/EmptyState'
import IconFrame from '@/components/shared/IconFrame'
import { useEmployeesStore } from '../_store/employeesStore'
import { useSearchParams } from 'next/navigation'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { LiUserCircle } from '@/icons'

const EmployeeGridView = () => {
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 20

    const employees = useEmployeesStore((state) => state.data.employees)
    const total = useEmployeesStore((state) => state.data.total)
    const initialLoading = useEmployeesStore((state) => state.initialLoading)
    const selectedEmployees = useEmployeesStore(
        (state) => state.selectedEmployees,
    )
    const openEditEmployee = useEmployeesStore(
        (state) => state.openEditEmployee,
    )
    const openDeleteEmployee = useEmployeesStore(
        (state) => state.openDeleteEmployee,
    )
    const openBulkEdit = useEmployeesStore((state) => state.openBulkEdit)
    const openBulkDelete = useEmployeesStore((state) => state.openBulkDelete)
    const setViewEmployeeId = useEmployeesStore(
        (state) => state.setViewEmployeeId,
    )

    const handlePageChange = (page: number) => {
        appendQueryParams({ pageIndex: page })
    }

    const handlePageSizeChange = (size: number) => {
        appendQueryParams({ pageSize: size, pageIndex: 1 })
    }

    if (initialLoading) {
        return (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 20 }).map((_, index) => (
                    <EmployeeCardSkeleton key={index} />
                ))}
            </div>
        )
    }

    if (employees.length === 0) {
        return (
            <div className="flex-1 flex flex-col items-center justify-center my-8">
                <EmptyState
                    variant="dots"
                    offset={-24}
                    size={180}
                    illustration={
                        <IconFrame className="bg-white dark:bg-gray-700">
                            <LiUserCircle className="text-xl heading-text" />
                        </IconFrame>
                    }
                >
                    <div className="text-center">
                        <h5>No employees found</h5>
                        <p className="max-w-[500px]">
                            Try adjusting your search or filter criteria.
                        </p>
                    </div>
                </EmptyState>
            </div>
        )
    }

    return (
        <div className="relative">
            {selectedEmployees.length > 0 && (
                <BulkActionBar
                    selectedCount={selectedEmployees.length}
                    onEdit={openBulkEdit}
                    onDelete={openBulkDelete}
                />
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-4">
                {employees.map((employee) => (
                    <EmployeeCard
                        key={employee.id}
                        employee={employee}
                        onViewDetails={(emp) => setViewEmployeeId(emp.id)}
                        onEdit={openEditEmployee}
                        onDelete={openDeleteEmployee}
                    />
                ))}
            </div>
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <Pagination
                    total={total}
                    currentPage={pageIndex}
                    pageSize={pageSize}
                    onChange={handlePageChange}
                />
                <div className="flex items-center gap-2">
                    <Select
                        size="sm"
                        value={{
                            value: pageSize,
                            label: `${pageSize} / page`,
                        }}
                        options={[
                            { value: 20, label: '20 / page' },
                            { value: 40, label: '40 / page' },
                            { value: 80, label: '80 / page' },
                            { value: 120, label: '120 / page' },
                        ]}
                        onChange={(option) =>
                            handlePageSizeChange(option?.value || 20)
                        }
                        isSearchable={false}
                        className="min-w-[120px]"
                    />
                </div>
            </div>
        </div>
    )
}

export default EmployeeGridView
