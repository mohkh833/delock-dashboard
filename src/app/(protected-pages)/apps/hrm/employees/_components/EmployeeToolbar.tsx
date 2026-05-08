'use client'

import { useState, useMemo } from 'react'
import useSWR from 'swr'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import Segment from '@/components/ui/Segment'
import Container from '@/components/shared/Container'
import PopoverFilter from '@/components/shared/PopoverFilter'
import useDebounce from '@/utils/hooks/useDebounce'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useEmployeesStore } from '../_store/employeesStore'
import {
    apiGetDepartments,
    apiGetRolesByDepartments,
} from '@/services/client/HrmService'
import { useSearchParams } from 'next/navigation'
import {
    LiSetting4,
    LiTextAlignLeft,
    LiElement3,
    LiChevronDown,
    LiUserAdd,
} from '@/icons'
import { LuSearch, LuArrowDownAZ, LuArrowUpAZ, LuCheck } from 'react-icons/lu'
import type { Department } from '../types'

const EmployeeToolbar = () => {
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const query = searchParams.get('query') || ''
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = searchParams.get('sortOrder') || 'asc'
    const employmentTypes = searchParams.get('employmentTypes') || ''
    const departments = searchParams.get('departments') || ''
    const roles = searchParams.get('roles') || ''

    const viewMode = useEmployeesStore((state) => state.viewMode)
    const setViewMode = useEmployeesStore((state) => state.setViewMode)
    const clearSelection = useEmployeesStore((state) => state.clearSelection)
    const openAddEmployee = useEmployeesStore((state) => state.openAddEmployee)
    const openBatchUpload = useEmployeesStore((state) => state.openBatchUpload)

    const [currentSortOrder, setCurrentSortOrder] = useState<string>(
        sortOrder || 'asc',
    )
    const debouncedSearch = useDebounce((value: string) => {
        appendQueryParams({ query: value, pageIndex: 1 })
    }, 500)

    const { data: departmentList } = useSWR(
        '/api/hrm/departments',
        () => apiGetDepartments<Department[]>(),
        { revalidateOnFocus: false },
    )

    const departmentsForRoles = departments.split(',').filter(Boolean)
    const { data: availableRoles } = useSWR(
        departmentsForRoles.length > 0
            ? ['/api/hrm/roles', departmentsForRoles]
            : null,
        ([, depts]) => apiGetRolesByDepartments<string[]>(depts as string[]),
        { revalidateOnFocus: false },
    )

    const employmentTypeOptions = useMemo(
        () => [
            { value: 'full-time', label: 'Full-time' },
            { value: 'part-time', label: 'Part-time' },
            { value: 'contract', label: 'Contract' },
            { value: 'intern', label: 'Intern' },
            { value: 'freelance', label: 'Freelance' },
        ],
        [],
    )

    const departmentOptions = useMemo(() => {
        if (!departmentList) return []
        return departmentList.map((dept) => ({
            value: dept.name,
            label: dept.name,
        }))
    }, [departmentList])

    const roleOptions = useMemo(() => {
        if (!availableRoles) return []
        return availableRoles.map((role) => ({
            value: role,
            label: role,
        }))
    }, [availableRoles])

    const sortFieldOptions = [
        { key: 'employeeId', label: 'Employee ID' },
        { key: 'name', label: 'Name' },
        { key: 'department', label: 'Department' },
        { key: 'role', label: 'Role' },
        { key: 'employmentType', label: 'Employment Type' },
        { key: 'currentStatus', label: 'Current Status' },
        { key: 'joiningDate', label: 'Joining Date' },
    ]

    const selectedEmploymentTypes = employmentTypes.split(',').filter(Boolean)
    const selectedDepartments = departments.split(',').filter(Boolean)
    const selectedRoles = roles.split(',').filter(Boolean)

    const handleEmploymentTypeChange = (
        selectedOptions: Array<{ value: string; label: string }>,
    ) => {
        const types = selectedOptions.map((o) => o.value).join(',')
        appendQueryParams({ employmentTypes: types, pageIndex: 1 })
    }

    const handleDepartmentChange = (
        selectedOptions: Array<{ value: string; label: string }>,
    ) => {
        const depts = selectedOptions.map((o) => o.value).join(',')
        appendQueryParams({ departments: depts, roles: '', pageIndex: 1 })
    }

    const handleRoleChange = (
        selectedOptions: Array<{ value: string; label: string }>,
    ) => {
        const roleStr = selectedOptions.map((o) => o.value).join(',')
        appendQueryParams({ roles: roleStr, pageIndex: 1 })
    }

    const handleSorting = (key: string) => {
        appendQueryParams({ sortKey: key, sortOrder: currentSortOrder })
    }

    const handleResetSort = () => {
        appendQueryParams({ sortKey: '', sortOrder: '' })
        setCurrentSortOrder('asc')
    }

    const getSortButtonLabel = () => {
        const sortField = sortFieldOptions.find((f) => f.key === sortKey)
        return sortField ? `Sort by: ${sortField.label}` : 'Sort'
    }

    const handleViewModeChange = (mode: string) => {
        setViewMode(mode as 'grid' | 'list')
        clearSelection()
    }

    const badgeClasses =
        'ml-1 bg-primary text-white rounded min-w-4 min-h-4 inline-flex items-center justify-center text-xs text-center'

    return (
        <Container className="px-4">
            <div className="flex flex-col lg:flex-row justify-between gap-2">
                <div className="flex flex-col sm:flex-row gap-2">
                    <Input
                        placeholder="Search employees..."
                        className="lg:max-w-[250px]"
                        defaultValue={query}
                        onChange={(e) => debouncedSearch(e.target.value)}
                        prefix={<LuSearch className="text-lg" />}
                    />
                    <PopoverFilter
                        data={employmentTypeOptions}
                        value={selectedEmploymentTypes}
                        onChange={handleEmploymentTypeChange}
                        title="Employment Type"
                        inputPlaceholder="Search types..."
                        renderTrigger={
                            <Button variant="default" icon={<LiSetting4 />}>
                                Employment Type
                                {selectedEmploymentTypes.length > 0 && (
                                    <span className={badgeClasses}>
                                        {selectedEmploymentTypes.length}
                                    </span>
                                )}
                            </Button>
                        }
                    />
                    <PopoverFilter
                        data={departmentOptions}
                        value={selectedDepartments}
                        onChange={handleDepartmentChange}
                        title="Department"
                        inputPlaceholder="Search departments..."
                        renderTrigger={
                            <Button icon={<LiSetting4 />}>
                                Department
                                {selectedDepartments.length > 0 && (
                                    <span className={badgeClasses}>
                                        {selectedDepartments.length}
                                    </span>
                                )}
                            </Button>
                        }
                    />
                    {selectedDepartments.length > 0 && (
                        <PopoverFilter
                            data={roleOptions}
                            value={selectedRoles}
                            onChange={handleRoleChange}
                            title="Role"
                            inputPlaceholder="Search roles..."
                            renderTrigger={
                                <Button variant="default" icon={<LiSetting4 />}>
                                    Role
                                    {selectedRoles.length > 0 && (
                                        <span className={badgeClasses}>
                                            {selectedRoles.length}
                                        </span>
                                    )}
                                </Button>
                            }
                        />
                    )}
                </div>
                <div className="flex justify-between items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Segment
                            value={viewMode}
                            onChange={handleViewModeChange}
                        >
                            <Segment.Item value="grid" className="px-2">
                                <LiElement3 />
                            </Segment.Item>
                            <Segment.Item value="list" className="px-2">
                                <LiTextAlignLeft />
                            </Segment.Item>
                        </Segment>
                        {viewMode === 'grid' && (
                            <Dropdown
                                placement="bottom-end"
                                renderTitle={
                                    <Button
                                        icon={
                                            currentSortOrder === 'asc' ? (
                                                <LuArrowUpAZ />
                                            ) : (
                                                <LuArrowDownAZ />
                                            )
                                        }
                                    >
                                        <span className="flex items-center gap-1">
                                            {getSortButtonLabel()}
                                        </span>
                                    </Button>
                                }
                            >
                                <div className="mb-1">
                                    <Segment
                                        value={currentSortOrder}
                                        className="w-full"
                                        onChange={setCurrentSortOrder}
                                    >
                                        <Segment.Item value="asc">
                                            <span className="flex items-center gap-1">
                                                <LuArrowUpAZ />
                                                <span>Asc</span>
                                            </span>
                                        </Segment.Item>
                                        <Segment.Item value="desc">
                                            <span className="flex items-center gap-1">
                                                <LuArrowDownAZ />
                                                <span>Desc</span>
                                            </span>
                                        </Segment.Item>
                                    </Segment>
                                </div>
                                {sortFieldOptions.map((field) => (
                                    <Dropdown.Item
                                        key={field.key}
                                        onClick={() => handleSorting(field.key)}
                                        active={sortKey === field.key}
                                    >
                                        <span className="flex items-center justify-between w-full">
                                            <span>{field.label}</span>
                                            {sortKey === field.key && (
                                                <LuCheck />
                                            )}
                                        </span>
                                    </Dropdown.Item>
                                ))}
                                {sortKey && (
                                    <>
                                        <Dropdown.Item variant="divider" />
                                        <Dropdown.Item
                                            onClick={handleResetSort}
                                        >
                                            <span className="text-error">
                                                Reset Sort
                                            </span>
                                        </Dropdown.Item>
                                    </>
                                )}
                            </Dropdown>
                        )}
                    </div>
                    <Dropdown
                        placement="bottom-end"
                        renderTitle={
                            <>
                                <Button
                                    variant="subtle"
                                    className="hidden sm:inline-block"
                                    icon={
                                        <>
                                            <LiChevronDown />
                                        </>
                                    }
                                    iconAlignment="end"
                                >
                                    Add Employee
                                </Button>
                                <Button
                                    variant="subtle"
                                    className="sm:hidden"
                                    icon={
                                        <>
                                            <LiUserAdd />
                                        </>
                                    }
                                    iconAlignment="end"
                                ></Button>
                            </>
                        }
                    >
                        <Dropdown.Item onClick={openAddEmployee}>
                            Add Individual Employee
                        </Dropdown.Item>
                        <Dropdown.Item onClick={openBatchUpload}>
                            Batch Add Employee
                        </Dropdown.Item>
                    </Dropdown>
                </div>
            </div>
        </Container>
    )
}

export default EmployeeToolbar
