'use client'
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Select from '@/components/ui/Select'
import Pagination from '@/components/ui/Pagination'
import ExpandableOrderDetails from './ExpandableOrderDetails'
import { statusMap, paymentStatusMap } from './utils'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import classNames from '@/utils/classNames'
import { LiBox, LiUser, LiCalendar } from '@/icons'
import { NumericFormat } from 'react-number-format'
import dayjs from 'dayjs'
import type {
    GetOrderListResponse,
    Order,
    OrderListSearchParams,
} from './types'

const pageSizeOption = [
    { value: 10, label: '10 / page' },
    { value: 25, label: '25 / page' },
    { value: 50, label: '50 / page' },
    { value: 100, label: '100 / page' },
]

const List = ({
    data,
    searchParams,
}: {
    data: GetOrderListResponse
    searchParams: OrderListSearchParams
}) => {
    const appendQueryParams = useAppendQueryParams()

    const [expandedOrderId, setExpandedOrderId] = useState('')

    const handleExpand = (orderId: string) => {
        if (expandedOrderId === orderId) {
            setExpandedOrderId('')
        } else {
            setExpandedOrderId(orderId)
        }
    }

    const onPaginationChange = (pageIndex: number) => {
        appendQueryParams({ pageIndex })
    }

    const onPageSizeChange = (pageSize: number | undefined) => {
        appendQueryParams({ pageSize, pageIndex: 1 })
    }

    return (
        <div>
            {data && (
                <>
                    <div className="space-y-4">
                        {data.list.map((order: Order) => (
                            <Card
                                className={classNames(
                                    expandedOrderId !== order.id &&
                                        'print:hidden',
                                )}
                                footer={{
                                    className: 'p-0 border-dashed',
                                    content: (
                                        <ExpandableOrderDetails
                                            expand={
                                                expandedOrderId === order.id
                                            }
                                            orderId={expandedOrderId}
                                            onExpand={() =>
                                                handleExpand(order.id)
                                            }
                                        />
                                    ),
                                }}
                                key={order.id}
                            >
                                <div className="flex justify-between">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <div className="print:hidden">
                                                <Avatar
                                                    size={20}
                                                    className={classNames(
                                                        'border-0',
                                                        statusMap[order.status]
                                                            ?.color.bg,
                                                        statusMap[order.status]
                                                            ?.color.text,
                                                    )}
                                                    icon={
                                                        <span className="text-base">
                                                            {
                                                                statusMap[
                                                                    order.status
                                                                ]?.icon
                                                            }
                                                        </span>
                                                    }
                                                />
                                            </div>
                                            <h6>#{order.id}</h6>
                                        </div>
                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-2 mt-2">
                                            <span
                                                className={classNames(
                                                    'font-medium',
                                                )}
                                            >
                                                {statusMap[order.status]?.label}
                                            </span>
                                            <span className="hidden sm:inline">
                                                •
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <LiCalendar className="text-base" />
                                                <span className="leading-none font-medium">
                                                    {dayjs(order.date).format(
                                                        'MMM DD, YYYY',
                                                    )}
                                                </span>
                                            </span>
                                            <span className="hidden sm:inline">
                                                •
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <LiBox className="text-base" />
                                                <span className="leading-none font-medium">
                                                    {order.productCount} item
                                                    {order.productCount > 1 &&
                                                        's'}
                                                </span>
                                            </span>
                                            <span className="hidden sm:inline">
                                                •
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <LiUser className="text-base" />
                                                <span className="leading-none font-medium">
                                                    {order.customer.name}
                                                </span>
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col gap-2">
                                            <h6>
                                                <NumericFormat
                                                    displayType="text"
                                                    value={order.totalAmount}
                                                    prefix={'$'}
                                                    decimalScale={2}
                                                    fixedDecimalScale
                                                    thousandSeparator={true}
                                                />
                                            </h6>
                                            <div className="flex justify-end">
                                                <Tag
                                                    className={classNames(
                                                        'bg-transparent',
                                                        paymentStatusMap[
                                                            order.paymentStatus
                                                        ]?.color.text,
                                                    )}
                                                >
                                                    {
                                                        paymentStatusMap[
                                                            order.paymentStatus
                                                        ]?.label
                                                    }
                                                </Tag>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </div>
                    <div className="py-4 flex justify-between print:hidden">
                        <Pagination
                            pageSize={searchParams.pageSize}
                            currentPage={searchParams.pageIndex}
                            total={data.total}
                            onChange={onPaginationChange}
                        />
                        <Select
                            size="sm"
                            className="w-[120px]"
                            placement="top"
                            isSearchable={false}
                            value={
                                pageSizeOption.find(
                                    (option) =>
                                        option.value === searchParams.pageSize,
                                ) || pageSizeOption[0]
                            }
                            options={pageSizeOption}
                            onChange={(option) =>
                                onPageSizeChange(option?.value)
                            }
                        />
                    </div>
                </>
            )}
        </div>
    )
}

export default List
