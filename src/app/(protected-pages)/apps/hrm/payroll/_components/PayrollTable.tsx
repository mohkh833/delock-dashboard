'use client'

import { useMemo, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import dayjs from 'dayjs'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import DataTable from '@/components/shared/DataTable'
import DebouceInput from '@/components/shared/DebouceInput'
import classNames from '@/utils/classNames'
import formatCurrency from '@/utils/formatCurrency'
import sleep from '@/utils/sleep'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { colors } from '@/constants/colors.constant'
import { usePayrollStore } from '../_store/payrollStore'
import {
    LiProfile,
    LiTickCircle,
    LiCrossCircle,
    LiAdd,
    LiImport,
} from '@/icons'
import { LuEllipsis, LuSearch } from 'react-icons/lu'
import type { ColumnDef } from '@tanstack/react-table'
import type { TableQueries } from '@/@types/common'
import type { PayrollRecord, PayrollStatus } from '../types'

type PayrollTableProps = {
    onAddPayroll: () => void
    onViewPaySlip: (record: PayrollRecord) => void
}

const PayrollTable = ({ onAddPayroll, onViewPaySlip }: PayrollTableProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const records = usePayrollStore((state) => state.data.records)
    const total = usePayrollStore((state) => state.data.total)
    const initialLoading = usePayrollStore((state) => state.initialLoading)
    const updatePayrollRecord = usePayrollStore(
        (state) => state.updatePayrollRecord,
    )

    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 10
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = (searchParams.get('sortOrder') || '') as
        | ''
        | 'asc'
        | 'desc'

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
            sortKey: data.sortKey || null,
            sortOrder: data.sortOrder || null,
        })
    }

    const handleSearch = (query: string) => {
        appendQueryParams({ query: query || null, pageIndex: 1 })
    }

    const handleRowAction = useCallback(
        async (action: string, record: PayrollRecord) => {
            switch (action) {
                case 'approve':
                    await sleep(500)
                    updatePayrollRecord(record.id, {
                        status: 'paid' as PayrollStatus,
                        processedAt: dayjs().toISOString(),
                    })
                    break
                case 'decline':
                    await sleep(500)
                    updatePayrollRecord(record.id, {
                        status: 'failed' as PayrollStatus,
                    })
                    break
                case 'viewProfile':
                    router.push(`/apps/hrm/employees?id=${record.employee.id}`)
                    break
                case 'viewPaySlip':
                    onViewPaySlip(record)
                    break
            }
        },
        [router, updatePayrollRecord, onViewPaySlip],
    )

    const getStatusBadge = useCallback((status: PayrollStatus) => {
        const statusConfig = {
            paid: {
                className: `${colors.emerald.iconBg} ${colors.emerald.iconText}`,
                label: 'Paid',
            },
            pending: {
                className: `${colors.yellow.iconBg} ${colors.yellow.iconText}`,
                label: 'Pending',
            },
            processing: {
                className: `${colors.blue.iconBg} ${colors.blue.iconText}`,
                label: 'Processing',
            },
            failed: {
                className: `${colors.red.iconBg} ${colors.red.iconText}`,
                label: 'Declined',
            },
        }
        const config = statusConfig[status]
        return (
            <Tag className={classNames(config.className, 'border-0')}>
                {config.label}
            </Tag>
        )
    }, [])

    const getActionDropdown = useCallback(
        (record: PayrollRecord) => {
            const items = [
                {
                    key: 'viewProfile',
                    label: 'View Profile',
                    icon: <LiProfile />,
                    disabled: false,
                },
                {
                    key: 'approve',
                    label: 'Approve',
                    icon: <LiTickCircle />,
                    disabled: record.status !== 'pending',
                },
                {
                    key: 'decline',
                    label: 'Decline',
                    icon: <LiCrossCircle />,
                    disabled: record.status !== 'pending',
                    className: 'text-red-600 hover:text-red-700',
                },
            ]

            return (
                <div className="inline-flex">
                    <Dropdown
                        placement="bottom-end"
                        renderTitle={
                            <Button
                                size="sm"
                                variant="ghost"
                                shape="circle"
                                icon={<LuEllipsis />}
                            />
                        }
                    >
                        {items.map((item) => (
                            <Dropdown.Item
                                key={item.key}
                                eventKey={item.key}
                                onClick={
                                    item.disabled
                                        ? undefined
                                        : () =>
                                              handleRowAction(item.key, record)
                                }
                                disabled={item.disabled}
                                className={item.className}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            )
        },
        [handleRowAction],
    )

    const columns: ColumnDef<PayrollRecord>[] = useMemo(
        () => [
            {
                accessorKey: 'employee',
                header: 'Employee',
                cell: ({ row }) => {
                    const employee = row.original.employee
                    return (
                        <div className="flex items-center gap-2">
                            <Avatar
                                size={25}
                                shape="circle"
                                src={employee.avatar}
                                alt={employee.name}
                            >
                                {employee.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </Avatar>
                            <div className="font-medium heading-text text-nowrap">
                                {employee.name}
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: 'department',
                header: 'Department',
                cell: ({ row }) => row.original.employee.department,
            },
            {
                accessorKey: 'basicSalary',
                header: 'Basic Salary',
                cell: ({ row }) => formatCurrency(row.original.basicSalary),
            },
            {
                accessorKey: 'allowances',
                header: 'Allowances',
                cell: ({ row }) => formatCurrency(row.original.allowances),
            },
            {
                accessorKey: 'deductions',
                header: 'Deductions',
                cell: ({ row }) => formatCurrency(row.original.deductions),
            },
            {
                accessorKey: 'netPay',
                header: 'Net Pay',
                cell: ({ row }) => (
                    <span className="font-medium heading-text">
                        {formatCurrency(row.original.netPay)}
                    </span>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => getStatusBadge(row.original.status),
            },
            {
                id: 'actions',
                header: 'Action',
                cell: ({ row }) => getActionDropdown(row.original),
            },
        ],
        [getStatusBadge, getActionDropdown],
    )

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between gap-2">
                <div className="flex-1">
                    <DebouceInput
                        className="lg:max-w-[250px]"
                        prefix={<LuSearch className="text-base heading-text" />}
                        placeholder="Search employees..."
                        wait={300}
                        defaultValue={searchParams.get('query') || ''}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            handleSearch(e.target.value)
                        }
                    />
                </div>
                <div className="flex items-center gap-2">
                    <Button icon={<LiAdd />} onClick={onAddPayroll}>
                        Add Payroll Record
                    </Button>
                    <Button icon={<LiImport />}>Export</Button>
                </div>
            </div>

            <DataTable
                columns={columns}
                data={records}
                loading={initialLoading}
                pagingData={{
                    total,
                    pageIndex: pagingState.pageIndex || 1,
                    pageSize: pagingState.pageSize || 10,
                }}
                pageSizes={[10, 20, 50]}
                onPaginationChange={(page) =>
                    handlePagingChange({ ...pagingState, pageIndex: page })
                }
                onPageSizeChange={(size) =>
                    handlePagingChange({
                        ...pagingState,
                        pageSize: size,
                        pageIndex: 1,
                    })
                }
                onSort={(sort) =>
                    handlePagingChange({
                        ...pagingState,
                        sortKey: String(sort.sortKey),
                        sortOrder: sort.sortOrder,
                        pageIndex: 1,
                    })
                }
            />
        </div>
    )
}

export default PayrollTable
