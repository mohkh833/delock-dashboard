'use client'
import React, { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    createColumnHelper,
} from '@tanstack/react-table'
import Card from '@/components/ui/Card'
import Table from '@/components/ui/Table'
import ImposibleCube from '@/components/svg/icons/ImposibleCube'
import ImposibleSphere from '@/components/svg/icons/ImposibleSphere'
import ImposibleTriangle from '@/components/svg/icons/ImposibleTriangle'
import { LiCard, LiPaypal, LiBank } from '@/icons'
import type {
    RevenueBreakdownData,
    PlanBreakdownData,
    RegionBreakdownData,
    PaymentMethodBreakdownData,
} from './types'

const { Tr, Th, Td, THead, TBody } = Table

type GroupedBreakdownData = {
    category: string
    items: Array<
        PlanBreakdownData | RegionBreakdownData | PaymentMethodBreakdownData
    >
}

const Name = ({ name }: { name: string }) => {
    const renderIcon = (name: string) => {
        switch (name) {
            case 'Basic':
                return (
                    <span className="text-primary rounded">
                        <ImposibleSphere
                            height={18}
                            width={18}
                            pathClass="stroke-10"
                        />
                    </span>
                )
            case 'Pro':
                return (
                    <span className="text-yellow-500 rounded">
                        <ImposibleTriangle
                            height={18}
                            width={18}
                            pathClass="stroke-10"
                        />
                    </span>
                )
            case 'Enterprise':
                return (
                    <span className="text-purple-500 rounded">
                        <ImposibleCube
                            height={18}
                            width={18}
                            pathClass="stroke-10"
                        />
                    </span>
                )
            case 'United States':
                return (
                    <Avatar
                        shape="circle"
                        size={18}
                        src="/img/countries/US.png"
                    />
                )
            case 'Brazil':
                return (
                    <Avatar
                        shape="circle"
                        size={18}
                        src="/img/countries/BR.png"
                    />
                )
            case 'India':
                return (
                    <Avatar
                        shape="circle"
                        size={18}
                        src="/img/countries/IN.png"
                    />
                )
            case 'United Kingdom':
                return (
                    <Avatar
                        shape="circle"
                        size={18}
                        src="/img/countries/UK.png"
                    />
                )
            case 'Credit Card':
                return <LiCard className="text-orange-500 text-lg" />
            case 'PayPal':
                return <LiPaypal className="text-blue-500 text-lg" />
            case 'Bank Transfer':
                return <LiBank className="text-indigo-500 text-lg" />
            default:
                return <></>
        }
    }

    return (
        <span className="font-semibold flex items-center gap-2">
            {renderIcon(name)}
            <span>{name}</span>
        </span>
    )
}

type RevenueBreakdownTableProps = {
    breakdownData: RevenueBreakdownData
}

const RevenueBreakdownTable = ({
    breakdownData,
}: RevenueBreakdownTableProps) => {
    const formatCurrency = (value: number) => `$${value.toLocaleString()}`
    const formatPercentage = (value: number) => `${value}%`
    const formatGrowth = (growth: number) => {
        const formatted = `${growth >= 0 ? '+' : ''}${growth}%`
        return (
            <span
                className={`font-medium ${growth >= 0 ? 'text-success' : 'text-error'}`}
            >
                {formatted}
            </span>
        )
    }

    const getName = (
        item:
            | PlanBreakdownData
            | RegionBreakdownData
            | PaymentMethodBreakdownData,
    ) => {
        if ('plan' in item) return item.plan
        if ('region' in item) return item.region
        if ('paymentMethod' in item) return item.paymentMethod
        return ''
    }

    const groupedData: GroupedBreakdownData[] = useMemo(
        () => [
            { category: 'Plan / Segment', items: breakdownData?.byPlan || [] },
            { category: 'Country', items: breakdownData?.byRegion || [] },
            {
                category: 'Payment Method',
                items: breakdownData?.byPaymentMethod || [],
            },
        ],
        [breakdownData],
    )

    const flattenedData = useMemo(
        () =>
            groupedData.flatMap((group) =>
                group.items.map((item) => ({
                    ...item,
                    category: group.category,
                    name: getName(item),
                })),
            ),
        [groupedData],
    )

    const columnHelper = createColumnHelper<(typeof flattenedData)[0]>()

    const columns = useMemo(
        () => [
            columnHelper.accessor('name', {
                id: 'name',
                header: '',
                cell: (info) => <Name name={info.getValue()} />,
            }),
            columnHelper.accessor('customers', {
                id: 'customers',
                header: 'Customers',
                cell: (info) => info.getValue().toLocaleString(),
            }),
            columnHelper.accessor('mrr', {
                id: 'mrr',
                header: 'MRR',
                cell: (info) => formatCurrency(info.getValue()),
            }),
            columnHelper.accessor('arr', {
                id: 'arr',
                header: 'ARR',
                cell: (info) => formatCurrency(info.getValue()),
            }),
            columnHelper.accessor('percentageOfTotal', {
                id: 'percentageOfTotal',
                header: '% of Total Revenue',
                cell: (info) => formatPercentage(info.getValue()),
            }),
            columnHelper.accessor('growthMoM', {
                id: 'growthMoM',
                header: 'Growth (MoM)',
                cell: (info) => formatGrowth(info.getValue()),
            }),
        ],
        [columnHelper],
    )

    const table = useReactTable({
        data: flattenedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
    })

    return (
        <Card bodyClass="p-0">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h5>Revenue Breakdown</h5>
                    <p>Analyze revenue sources by different dimensions</p>
                </div>
                <Button className="w-full sm:w-auto">Export Data</Button>
            </div>
            <div className="overflow-x-auto">
                <Table className="min-w-full">
                    <THead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr className="bg-transparent" key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <Th
                                        key={header.id}
                                        className="text-left whitespace-nowrap"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext(),
                                              )}
                                    </Th>
                                ))}
                            </Tr>
                        ))}
                    </THead>
                    <TBody>
                        {groupedData.map((group, groupIndex) => (
                            <React.Fragment key={group.category}>
                                <Tr className="bg-gray-50 dark:bg-gray-800 hover:bg-transparent">
                                    <Td
                                        colSpan={6}
                                        className="font-medium heading-text py-2.5"
                                    >
                                        {group.category}
                                    </Td>
                                </Tr>
                                {group.items.map((_, itemIndex) => {
                                    const flatIndex =
                                        groupedData
                                            .slice(0, groupIndex)
                                            .reduce(
                                                (acc, g) =>
                                                    acc + g.items.length,
                                                0,
                                            ) + itemIndex
                                    const row =
                                        table.getRowModel().rows[flatIndex]
                                    return (
                                        <Tr
                                            key={`${group.category}-${itemIndex}`}
                                        >
                                            {row
                                                ?.getVisibleCells()
                                                .map((cell) => (
                                                    <Td
                                                        key={cell.id}
                                                        className="whitespace-nowrap heading-text"
                                                    >
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext(),
                                                        )}
                                                    </Td>
                                                ))}
                                        </Tr>
                                    )
                                })}
                            </React.Fragment>
                        ))}
                    </TBody>
                </Table>
            </div>
        </Card>
    )
}

export default RevenueBreakdownTable
