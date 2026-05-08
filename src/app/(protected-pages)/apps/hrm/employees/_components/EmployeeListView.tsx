'use client'

import { useMemo } from 'react'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import BulkActionBar from './BulkActionBar'
import DataTable from '@/components/shared/DataTable'
import useDataTableState from '../_hooks/useDataTableState'
import { useEmployeesStore } from '../_store/employeesStore'
import { useSearchParams } from 'next/navigation'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { formatDate } from '@/utils/formatDate'
import { LuEllipsis, LuEye, LuPencil, LuTrash2 } from 'react-icons/lu'
import type { Employee } from '../types'
import type { ColumnDef } from '@/components/shared/DataTable'
import type { TableQueries } from '@/@types/common'

const EmployeeListView = () => {
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 20
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = (searchParams.get('sortOrder') || '') as
        | ''
        | 'asc'
        | 'desc'

    const employees = useEmployeesStore((state) => state.data.employees)
    const total = useEmployeesStore((state) => state.data.total)
    const initialLoading = useEmployeesStore((state) => state.initialLoading)
    const selectedEmployees = useEmployeesStore(
        (state) => state.selectedEmployees,
    )
    const setSelectedEmployees = useEmployeesStore(
        (state) => state.setSelectedEmployees,
    )
    const setViewEmployeeId = useEmployeesStore(
        (state) => state.setViewEmployeeId,
    )
    const openEditEmployee = useEmployeesStore(
        (state) => state.openEditEmployee,
    )
    const openDeleteEmployee = useEmployeesStore(
        (state) => state.openDeleteEmployee,
    )
    const openBulkEdit = useEmployeesStore((state) => state.openBulkEdit)
    const openBulkDelete = useEmployeesStore((state) => state.openBulkDelete)

    const pagingState: TableQueries = {
        pageIndex,
        pageSize,
        sortKey,
        sortOrder,
        query: searchParams.get('query') || '',
    }

    const handlePagingChange = (data: TableQueries) => {
        appendQueryParams({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            sortKey: data.sortKey,
            sortOrder: data.sortOrder,
        })
    }

    const handleRowSelect = (checked: boolean, row: Employee) => {
        if (checked) {
            setSelectedEmployees([...selectedEmployees, row.id])
        } else {
            setSelectedEmployees(
                selectedEmployees.filter((id) => id !== row.id),
            )
        }
    }

    const handleAllRowSelect = (rows: Employee[]) => {
        setSelectedEmployees(rows.map((row) => row.id))
    }

    const tableState = useDataTableState({
        pagingState,
        onPagingChange: handlePagingChange,
        selectedRows: selectedEmployees
            .map((id) => employees.find((emp) => emp.id === id))
            .filter((emp): emp is Employee => emp !== undefined),
        onRowSelectionChange: handleRowSelect,
        onAllRowSelectChange: handleAllRowSelect,
    })

    const getEmploymentTypeLabel = (type: string) => {
        switch (type) {
            case 'full-time':
                return 'Full-time'
            case 'part-time':
                return 'Part-time'
            case 'contract':
                return 'Contract'
            case 'intern':
                return 'Intern'
            case 'freelance':
                return 'Freelance'
            default:
                return type
        }
    }

    const columns: ColumnDef<Employee>[] = useMemo(
        () => [
            {
                id: 'name',
                accessorFn: (row) => row.personalInfo.fullName,
                header: 'Name',
                cell: ({ row }) => (
                    <div className="flex items-center gap-3">
                        <Avatar
                            size={25}
                            shape="circle"
                            src={row.original.personalInfo.profilePhoto}
                            alt={row.original.personalInfo.fullName}
                        >
                            {row.original.personalInfo.fullName
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </Avatar>
                        <div>
                            <div className="font-medium heading-text">
                                {row.original.personalInfo.fullName}
                            </div>
                            <div className="text-xs">
                                {row.original.personalInfo.email}
                            </div>
                        </div>
                    </div>
                ),
            },
            {
                id: 'employeeId',
                accessorFn: (row) => row.employeeId,
                header: 'Employee ID',
                cell: ({ row }) => (
                    <span className="heading-text">
                        {row.original.employeeId}
                    </span>
                ),
            },
            {
                id: 'department',
                accessorFn: (row) => row.jobInfo.department,
                header: 'Department',
                cell: ({ row }) => (
                    <span className="heading-text">
                        {row.original.jobInfo.department}
                    </span>
                ),
            },
            {
                id: 'role',
                accessorFn: (row) => row.jobInfo.role,
                header: 'Role',
                cell: ({ row }) => (
                    <span className="heading-text text-nowrap">
                        {row.original.jobInfo.role}
                    </span>
                ),
            },
            {
                id: 'employmentType',
                accessorFn: (row) => row.jobInfo.employmentType,
                header: 'Employment Type',
                cell: ({ row }) => (
                    <span className="heading-text">
                        {getEmploymentTypeLabel(
                            row.original.jobInfo.employmentType,
                        )}
                    </span>
                ),
            },
            {
                id: 'joiningDate',
                accessorFn: (row) => row.jobInfo.joiningDate,
                header: 'Joining Date',
                cell: ({ row }) => (
                    <span className="heading-text text-nowrap">
                        {formatDate(row.original.jobInfo.joiningDate)}
                    </span>
                ),
                size: 120,
            },
            {
                id: 'actions',
                cell: ({ row }) => (
                    <div className="text-center">
                        <Dropdown
                            placement="bottom-end"
                            toggleClassName="inline-flex"
                            renderTitle={
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    icon={<LuEllipsis />}
                                />
                            }
                        >
                            <Dropdown.Item
                                onClick={() =>
                                    setViewEmployeeId(row.original.id)
                                }
                                eventKey="view"
                            >
                                <div className="flex items-center gap-2">
                                    <LuEye />
                                    <span>View Details</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => openEditEmployee(row.original)}
                                eventKey="edit"
                            >
                                <div className="flex items-center gap-2">
                                    <LuPencil />
                                    <span>Edit</span>
                                </div>
                            </Dropdown.Item>
                            <Dropdown.Item
                                onClick={() => openDeleteEmployee(row.original)}
                                eventKey="delete"
                            >
                                <div className="flex items-center gap-2 text-red-600">
                                    <LuTrash2 />
                                    <span>Delete</span>
                                </div>
                            </Dropdown.Item>
                        </Dropdown>
                    </div>
                ),
                enableSorting: false,
                size: 80,
            },
        ],
        [setViewEmployeeId, openEditEmployee, openDeleteEmployee],
    )

    return (
        <div className="relative">
            {selectedEmployees.length > 0 && (
                <BulkActionBar
                    selectedCount={selectedEmployees.length}
                    onEdit={openBulkEdit}
                    onDelete={openBulkDelete}
                />
            )}
            <DataTable
                columns={columns}
                data={employees}
                loading={initialLoading}
                selectable
                {...tableState}
                pagingData={{
                    total,
                    pageIndex,
                    pageSize,
                }}
                pageSizes={[20, 40, 80, 120]}
                skeletonAvatarColumns={[2]}
            />
        </div>
    )
}

export default EmployeeListView
