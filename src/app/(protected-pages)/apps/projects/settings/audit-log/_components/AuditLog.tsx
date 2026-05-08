'use client'

import { useState, useMemo } from 'react'
import Button from '@/components/ui/Button'
import Segment from '@/components/ui/Segment'
import Popover from '@/components/ui/Popover'
import RangeCalendar from '@/components/ui/RangeCalendar'
import DataTable from '@/components/shared/DataTable'
import SettingsHeader from '../../_components/SettingsHeader'
import useDataTableState from '@/app/(protected-pages)/apps/customers/leads/_hooks/useDataTableState'
import { apiGetProjectAuditLog } from '@/services/client/ProjectService'
import { LiDownload, LiChevronDown, LiChevronUp } from '@/icons'
import useSWR from 'swr'
import dayjs from 'dayjs'
import type { TableQueries } from '@/@types/common'
import type { ColumnDef } from '@/components/shared/DataTable'

type LogInfo = {
    id: string
    timestamp: string
    actor: {
        id: string
        name: string
        email: string
        img: string
    }
    action: string
    target: string
    description: string
    ipAddress: string
    userAgent: string
}

type GetAuditLogsResponse = {
    list: LogInfo[]
    total: number
}

type AuditLogProps = {
    initialData: GetAuditLogsResponse
}

const AuditLog = ({ initialData }: AuditLogProps) => {
    const [paging, setPaging] = useState<TableQueries>({
        pageIndex: 1,
        pageSize: 10,
        query: '',
        sortOrder: '',
        sortKey: '',
    })

    const [presetDate, setPresetDate] = useState('30')
    const [dateRangePopoverOpen, setDateRangePopoverOpen] = useState(false)
    const [dateRange, setDateRange] = useState<[string | null, string | null]>([
        null,
        null,
    ])
    const [filter, setFilter] = useState<{ range: string[] }>({ range: [] })

    const convertStringToDate = (
        dateString: [string | null, string | null],
    ): [Date | null, Date | null] => {
        const [start, end] = dateString
        if (!start || !end) return [null, null]
        return [new Date(start), new Date(end)]
    }

    const convertDateToString = (
        date: [Date | null, Date | null],
    ): [string, string] => {
        const [start, end] = date
        if (!start || !end) return ['', '']
        return [start.toISOString(), end.toISOString()]
    }

    const handleSetFilter = (range: string[]) => setFilter({ range })

    const handlePresetDateChange = (value: string) => {
        setPresetDate(value)
        setDateRange([null, null])
        switch (value) {
            case '30':
                handleSetFilter([
                    dayjs().subtract(30, 'days').toISOString(),
                    dayjs().toISOString(),
                ])
                break
            case '60':
                handleSetFilter([
                    dayjs().subtract(60, 'days').toISOString(),
                    dayjs().toISOString(),
                ])
                break
            case '90':
                handleSetFilter([
                    dayjs().subtract(90, 'days').toISOString(),
                    dayjs().toISOString(),
                ])
                break
        }
    }

    const pagingStateHandler = useDataTableState({
        pagingState: paging,
        onPagingChange: setPaging,
    })

    const swrKey = ['/api/projects/audit-log', { ...paging, ...filter }]

    const { data, isLoading } = useSWR(
        swrKey,
        ([, params]) =>
            apiGetProjectAuditLog<
                GetAuditLogsResponse,
                Record<string, unknown>
            >(params as Record<string, unknown>),
        {
            fallbackData: initialData,
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const columns: ColumnDef<LogInfo>[] = useMemo(
        () => [
            {
                header: 'Actor',
                accessorKey: 'actor.name',
                cell: (props) => (
                    <div>
                        <div className="heading-text font-medium">
                            {props.row.original.actor.name}
                        </div>
                        <div>{props.row.original.actor.email}</div>
                    </div>
                ),
            },
            {
                header: 'Action',
                accessorKey: 'action',
                cell: (props) => <span>{props.row.original.action}</span>,
            },
            {
                header: 'Date & Time',
                accessorKey: 'timestamp',
                cell: (props) => (
                    <div>
                        <div className="heading-text">
                            {dayjs(props.row.original.timestamp).format(
                                'YYYY-MM-DD',
                            )}
                        </div>
                        <div>
                            {dayjs(props.row.original.timestamp).format(
                                'HH:mm:ss A',
                            )}
                        </div>
                    </div>
                ),
            },
        ],
        [],
    )

    const auditLogs = data?.list || []
    const auditLogsTotal = data?.total || 0

    return (
        <div className="space-y-4">
            <SettingsHeader
                title="Audit log"
                description="Track all critical activity within this project."
            />
            <div className="space-y-4">
                <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
                    <Segment
                        value={presetDate}
                        onChange={handlePresetDateChange}
                        className="w-full lg:w-auto"
                    >
                        <Segment.Item value="30">30 days</Segment.Item>
                        <Segment.Item value="60">60 days</Segment.Item>
                        <Segment.Item value="90">90 days</Segment.Item>
                    </Segment>
                    <div className="flex items-center gap-2 justify-end">
                        <Popover
                            title={
                                <span className="flex items-center gap-2">
                                    {dateRange[0]
                                        ? `${dayjs(dateRange[0]).format('MMM DD')} - ${dayjs(dateRange[1]).format('MMM DD')}`
                                        : 'Custom Date'}
                                    {dateRangePopoverOpen ? (
                                        <LiChevronUp />
                                    ) : (
                                        <LiChevronDown />
                                    )}
                                </span>
                            }
                            open={dateRangePopoverOpen}
                            placement="bottom-end"
                            onOpenChange={setDateRangePopoverOpen}
                            style={{ width: 280 }}
                        >
                            <RangeCalendar
                                value={convertStringToDate(dateRange)}
                                onChange={(val) => {
                                    setDateRange(convertDateToString(val))
                                    if (val[1]) {
                                        handleSetFilter(
                                            convertDateToString(val),
                                        )
                                        setPresetDate('')
                                        setDateRangePopoverOpen(false)
                                    }
                                }}
                            />
                        </Popover>
                        <Button icon={<LiDownload />}>Export Data</Button>
                    </div>
                </div>
                <div className="md:hidden space-y-3">
                    {isLoading ? (
                        <div className="space-y-3">
                            {[1, 2, 3].map((i) => (
                                <div
                                    key={i}
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 animate-pulse"
                                >
                                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/3 mb-2" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mb-2" />
                                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />
                                </div>
                            ))}
                        </div>
                    ) : auditLogs.length === 0 ? (
                        <div className="text-center py-8 text-gray-500">
                            No audit logs found
                        </div>
                    ) : (
                        auditLogs.map((log, index) => (
                            <div
                                key={index}
                                className="border border-gray-200 dark:border-gray-700 rounded-lg p-3 space-y-2"
                            >
                                <div className="flex items-start justify-between gap-2">
                                    <div>
                                        <div className="heading-text font-medium">
                                            {log.actor.name}
                                        </div>
                                        <div className="text-sm">
                                            {log.actor.email}
                                        </div>
                                    </div>
                                    <div className="text-right text-sm shrink-0">
                                        <div className="heading-text">
                                            {dayjs(log.timestamp).format(
                                                'YYYY-MM-DD',
                                            )}
                                        </div>
                                        <div>
                                            {dayjs(log.timestamp).format(
                                                'HH:mm:ss A',
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="text-sm">{log.action}</div>
                            </div>
                        ))
                    )}
                </div>
                <div className="hidden md:block">
                    <DataTable
                        compact
                        overflowClass="rounded-md border border-gray-200 dark:border-gray-700"
                        columns={columns}
                        data={auditLogs}
                        noData={!isLoading && auditLogs.length === 0}
                        skeletonAvatarColumns={[0]}
                        skeletonAvatarProps={{
                            width: 0,
                            height: 28,
                            className: 'opacity-0',
                        }}
                        loading={isLoading}
                        pagingData={{
                            total: auditLogsTotal,
                            pageIndex: paging.pageIndex as number,
                            pageSize: paging.pageSize as number,
                        }}
                        {...pagingStateHandler}
                    />
                </div>
            </div>
        </div>
    )
}

export default AuditLog
