'use client'

import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import { useCustomerListStore } from '../_store/customerListStore'
import useDataTableState from '../_hooks/useDataTableState'
import acronym from '@/utils/acronym'
import formatCurrency from '@/utils/formatCurrency'
import classNames from '@/utils/classNames'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import dayjs from 'dayjs'
import type { ColumnDef } from '@/components/shared/DataTable'
import type { Customer } from '../types'

const statusColor: Record<string, string> = {
    active: ' bg-success',
    inactive: 'bg-warning',
    suspended: 'bg-error',
}

const NameColumn = ({ row }: { row: Customer }) => {
    return (
        <div className="flex items-center gap-2">
            <Avatar size={30} shape="circle" src={row.img}>
                {acronym(row.name)}
            </Avatar>
            <Link
                className="hover:text-primary font-medium text-gray-900 dark:text-gray-100"
                href={`/apps/customers/${row.id}/overview`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const CustomerListTable = () => {
    const data = useCustomerListStore((state) => state.data)
    const initialLoading = useCustomerListStore((state) => state.initialLoading)
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 10
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = (searchParams.get('sortOrder') || '') as
        | ''
        | 'asc'
        | 'desc'
    const query = searchParams.get('query') || ''

    const selectedRows = useCustomerListStore((state) => state.selectedRows)
    const setSelectedRows = useCustomerListStore(
        (state) => state.setSelectedRows,
    )
    const setSelectAllRows = useCustomerListStore(
        (state) => state.setSelectAllRows,
    )

    const columns: ColumnDef<Customer>[] = useMemo(
        () => [
            {
                header: 'Name',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <NameColumn row={row} />
                },
            },
            {
                header: 'Email',
                accessorKey: 'email',
            },
            {
                header: 'Total Order',
                accessorKey: 'totalSpending',
                cell: (props) => {
                    return (
                        <span>
                            {formatCurrency(
                                props.row.original.totalSpending,
                                'USD',
                            )}
                        </span>
                    )
                },
            },
            {
                header: 'Status',
                accessorKey: 'status',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            <Tag
                                className={classNames(
                                    'rounded-full bg-transparent flex items-center gap-1 font-medium',
                                )}
                            >
                                <span
                                    className={classNames(
                                        'w-2 h-2 rounded-full',
                                        statusColor[row.status],
                                    )}
                                ></span>
                                <span className="capitalize">{row.status}</span>
                            </Tag>
                        </div>
                    )
                },
            },
            {
                header: 'Last order',
                accessorKey: 'lastOnline',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center">
                            {dayjs(row.lastOnline).format('DD MMM YYYY')}
                        </div>
                    )
                },
            },
        ],
        [],
    )

    const pagingStateHandler = useDataTableState({
        selectedRows,
        pagingState: { pageIndex, pageSize, sortKey, sortOrder, query },
        onPagingChange: (newData) => {
            appendQueryParams({
                pageIndex: String(newData.pageIndex),
                pageSize: String(newData.pageSize),
                sortKey: newData.sortKey || '',
                sortOrder: newData.sortOrder || '',
            })
        },
        onRowSelectionChange: setSelectedRows,
        onAllRowSelectChange: setSelectAllRows,
    })

    return (
        <DataTable
            selectable
            columns={columns}
            data={data?.list || []}
            noData={data?.list.length === 0}
            skeletonAvatarColumns={[0]}
            skeletonAvatarProps={{ width: 28, height: 28 }}
            loading={initialLoading}
            pagingData={{
                total: data?.total || 0,
                pageIndex: pageIndex as number,
                pageSize: pageSize as number,
            }}
            {...pagingStateHandler}
        />
    )
}

export default CustomerListTable
