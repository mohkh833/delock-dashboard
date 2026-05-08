'use client'
import { useMemo } from 'react'
import Image from 'next/image'
import ImposibleCube from '@/components/svg/icons/ImposibleCube'
import ImposibleSphere from '@/components/svg/icons/ImposibleSphere'
import ImposibleTriangle from '@/components/svg/icons/ImposibleTriangle'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import DataTable from '@/components/shared/DataTable'
import classNames from '@/utils/classNames'
import formatRelativeTime from '@/utils/formatRelativeTime'
import { colors } from '@/constants/colors.constant'
import { LiUser, LiDesktop, LiMobile, LiTablet } from '@/icons'
import dayjs from 'dayjs'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useReportColumnsStore } from './ReportActionTools'
import type { JSX } from 'react'
import type { ColumnDef } from '@tanstack/react-table'
import type { ReportRecord, GetReportsResponse } from '../types'

type ReportTablesProps = {
    data: GetReportsResponse
}

const ReportTables = ({ data }: ReportTablesProps) => {
    const visibleColumns = useReportColumnsStore((s) => s.visibleColumns)
    const appendQueryParams = useAppendQueryParams()

    const allColumns: ColumnDef<ReportRecord>[] = useMemo(
        () => [
            {
                id: 'plan',
                header: 'Plan',
                accessorKey: 'plan',
                cell: ({ row }) => {
                    const plan = row.original.plan
                    const planIcon: {
                        [key: string]: { icon: JSX.Element; className: string }
                    } = {
                        Basic: {
                            icon: (
                                <ImposibleSphere
                                    height={18}
                                    width={18}
                                    pathClass="stroke-10"
                                />
                            ),
                            className: 'text-primary',
                        },
                        Standard: {
                            icon: (
                                <ImposibleTriangle
                                    height={18}
                                    width={18}
                                    pathClass="stroke-10"
                                />
                            ),
                            className: 'text-yellow-500',
                        },
                        Pro: {
                            icon: (
                                <ImposibleCube
                                    height={18}
                                    width={18}
                                    pathClass="stroke-10"
                                />
                            ),
                            className: 'text-purple-500',
                        },
                    }
                    return (
                        <div className="flex items-center gap-2 text-nowrap">
                            <span className={planIcon[plan]?.className}>
                                {planIcon[plan]?.icon}
                            </span>
                            <span className="font-medium heading-text">
                                {plan}
                            </span>
                        </div>
                    )
                },
            },
            {
                id: 'customer',
                header: 'Customer',
                accessorKey: 'customer',
                cell: ({ row }) => {
                    const customer = row.original.customer
                    return (
                        <div className="flex items-center gap-2">
                            <Avatar
                                size={20}
                                shape="circle"
                                icon={<LiUser />}
                                alt={customer}
                            />
                            <div className="font-medium heading-text text-nowrap">
                                {customer}
                            </div>
                        </div>
                    )
                },
            },
            {
                id: 'email',
                header: 'Email',
                accessorKey: 'email',
                cell: ({ getValue }) => (
                    <span className="font-medium text-nowrap">
                        {getValue<string>()}
                    </span>
                ),
            },
            {
                id: 'amount',
                header: 'Amount',
                accessorKey: 'amount',
                cell: ({ getValue }) => (
                    <span className="font-medium text-nowrap">
                        ${getValue<number>().toFixed(2)}
                    </span>
                ),
            },
            {
                id: 'paymentMethod',
                header: 'Payment Method',
                accessorKey: 'paymentMethod',
                cell: ({ getValue }) => (
                    <span className="font-medium text-nowrap">
                        {getValue<string>()}
                    </span>
                ),
            },
            {
                id: 'status',
                header: 'Status',
                accessorKey: 'status',
                cell: ({ getValue }) => {
                    const status = getValue<string>()
                    const colorMap: { [key: string]: string } = {
                        Paid: classNames(
                            colors.emerald.iconBg,
                            colors.emerald.iconText,
                        ),
                        Pending: classNames(
                            colors.yellow.iconBg,
                            colors.yellow.iconText,
                        ),
                        Failed: classNames(
                            colors.red.iconBg,
                            colors.red.iconText,
                        ),
                        Refunded: classNames(
                            colors.purple.iconBg,
                            colors.purple.iconText,
                        ),
                    }
                    return (
                        <Tag
                            className={classNames(
                                'border-0',
                                colorMap[status] || '',
                            )}
                        >
                            {status}
                        </Tag>
                    )
                },
            },
            {
                id: 'signupDate',
                header: 'Signup Date',
                accessorKey: 'signupDate',
                cell: ({ getValue }) => (
                    <span className="font-medium text-nowrap">
                        {dayjs(getValue<string>()).format('MMM DD, YYYY')}
                    </span>
                ),
            },
            {
                id: 'lastActive',
                header: 'Last Active',
                accessorKey: 'lastActive',
                cell: ({ getValue }) => (
                    <div className="flex flex-col gap-1 text-nowrap">
                        <span className="font-medium">
                            {formatRelativeTime(getValue<string>())}
                        </span>
                    </div>
                ),
            },
            {
                id: 'mrrRange',
                header: 'MRR Range',
                accessorKey: 'mrrRange',
                cell: ({ getValue }) => <Tag>{getValue<string>()}</Tag>,
            },
            {
                id: 'autoRenewal',
                header: 'Auto Renewal',
                accessorKey: 'autoRenewal',
                cell: ({ getValue }) => {
                    const autoRenewal = getValue<boolean>()
                    return (
                        <Tag
                            className={classNames(
                                autoRenewal ? 'text-success' : 'text-error',
                                'bg-transparent',
                            )}
                        >
                            {autoRenewal ? 'Enabled' : 'Disabled'}
                        </Tag>
                    )
                },
            },
            {
                id: 'featureUsed',
                header: 'Features Used',
                accessorKey: 'featureUsed',
                cell: ({ getValue }) => {
                    const features = getValue<string[] | string>()
                    const featureArray = Array.isArray(features)
                        ? features
                        : [features].filter(Boolean)
                    if (featureArray.length === 0) {
                        return <span>No features</span>
                    }
                    return (
                        <div className="flex gap-1">
                            {featureArray.map((feature, index) => (
                                <Tag key={index}>{feature}</Tag>
                            ))}
                        </div>
                    )
                },
            },
            {
                id: 'device',
                header: 'Device',
                accessorKey: 'device',
                cell: ({ getValue }) => {
                    const device = getValue<string>()
                    const iconMap: { [key: string]: JSX.Element } = {
                        Desktop: <LiDesktop />,
                        Mobile: <LiMobile />,
                        Tablet: <LiTablet />,
                    }
                    return (
                        <span className="flex items-center gap-1 font-medium heading-text text-nowrap">
                            <span className="text-lg">{iconMap[device]}</span>
                            <span>{device}</span>
                        </span>
                    )
                },
            },
            {
                id: 'country',
                header: 'Country',
                accessorKey: 'country',
                cell: ({ row }) => (
                    <div className="flex items-center gap-2 text-nowrap">
                        <Image
                            src={`/img/countries/${row.original.countryCode}.png`}
                            alt={row.original.countryCode}
                            width={16}
                            height={16}
                        />
                        <span className="font-medium">
                            {row.original.country}
                        </span>
                    </div>
                ),
            },
        ],
        [],
    )

    const filteredColumns = useMemo(
        () =>
            allColumns.filter((col) =>
                visibleColumns.includes(col.id as string),
            ),
        [allColumns, visibleColumns],
    )

    return (
        <DataTable
            compact
            verticalDivider={{ head: true, body: true, footer: true }}
            className="border-b border-gray-200 dark:border-gray-800"
            columns={filteredColumns}
            data={data.list}
            noData={!data.list || data.list.length === 0}
            pagingData={{
                total: data.total,
                pageIndex: data.pageIndex,
                pageSize: data.pageSize,
            }}
            onPaginationChange={(page) =>
                appendQueryParams({ pageIndex: page })
            }
            onPageSizeChange={(size) =>
                appendQueryParams({ pageSize: size, pageIndex: 1 })
            }
            onSort={(sort) => appendQueryParams(sort as Record<string, string>)}
        />
    )
}

export default ReportTables
