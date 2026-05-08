import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import InfoBar from '@/components/shared/InfoBar'
import { useLeadsListStore } from '../_store/leadsListStore'
import useDataTableState from '../_hooks/useDataTableState'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import useRandomColor from '@/utils/hooks/useRandomColor'
import classNames from '@/utils/classNames'
import acronym from '@/utils/acronym'
import type { ColumnDef } from '@/components/shared/DataTable'
import type { Lead } from '../types'

const NameColumn = ({ row }: { row: Lead }) => {
    const generateRandomColor = useRandomColor()

    return (
        <div className="flex items-center gap-2">
            <Avatar
                size={25}
                shape="circle"
                className={classNames(
                    'border-0 text-gray-900',
                    generateRandomColor(row.name).background,
                )}
            >
                {acronym(row.name)}
            </Avatar>
            <Link
                className="hover:text-primary font-medium text-gray-900 dark:text-gray-100 underline text-nowrap"
                href={`/apps/customers/leads/${row.id}/overview`}
            >
                {row.name}
            </Link>
        </div>
    )
}

const probablityMap: Record<string, 'low' | 'medium' | 'high'> = {
    Low: 'low',
    Medium: 'medium',
    High: 'high',
}

const LeadListTable = () => {
    const data = useLeadsListStore((state) => state.data)
    const initialLoading = useLeadsListStore((state) => state.initialLoading)

    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 25
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = (searchParams.get('sortOrder') || '') as
        | ''
        | 'asc'
        | 'desc'
    const query = searchParams.get('query') || ''

    const setSelectedRows = useLeadsListStore((state) => state.setSelectedRows)
    const setSelectAllRows = useLeadsListStore(
        (state) => state.setSelectAllRows,
    )
    const selectedRows = useLeadsListStore((state) => state.selectedRows)

    const columns: ColumnDef<Lead>[] = useMemo(
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
                header: 'Organization',
                accessorKey: 'company',
                cell: (props) => {
                    return <span>{props.row.original.company}</span>
                },
            },
            {
                header: 'Phone',
                accessorKey: 'phoneNumber',
                cell: (props) => {
                    return (
                        <span className="text-nowrap">
                            {props.row.original.phoneNumber}
                        </span>
                    )
                },
            },
            {
                header: 'Tag',
                accessorKey: 'tags',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="inline-flex items-center justify-center gap-2">
                            {row?.tags?.map((tag, index) => (
                                <Tag
                                    key={`tag-${index}`}
                                    className="font-medium bg-white dark:bg-gray-800 shadow"
                                >
                                    <span>{tag}</span>
                                </Tag>
                            ))}
                        </div>
                    )
                },
            },
            {
                header: 'Probability',
                accessorKey: 'probability',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <div className="flex items-center gap-2">
                            <InfoBar level={probablityMap[row.probability]} />
                            <span className="font-medium">
                                {row.probability}
                            </span>
                        </div>
                    )
                },
                size: 100,
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
        <div className="mb-4">
            <DataTable
                compact
                selectable
                verticalDivider={{
                    head: true,
                    body: true,
                }}
                className="border-t border-b border-gray-200 dark:border-gray-700"
                columns={columns}
                data={data.list}
                noData={!initialLoading && data.list.length === 0}
                skeletonAvatarColumns={[1]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={initialLoading}
                checkboxChecked={(row: Lead) =>
                    selectedRows.some((selected) => selected.id === row.id)
                }
                pagingData={{
                    total: data.total,
                    pageIndex: pageIndex as number,
                    pageSize: pageSize as number,
                }}
                {...pagingStateHandler}
            />
        </div>
    )
}

export default LeadListTable
