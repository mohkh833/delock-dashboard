'use client'

import OrderListHeader from './OrderListHeader'
import OrderListContent from './OrderListContent'
import type {
    GetOrderListResponse,
    GetOrderStatisticsResponse,
    OrderListSearchParams,
} from './types'

type OrderListProps = {
    data: GetOrderListResponse
    statisticData: GetOrderStatisticsResponse
    searchParams: OrderListSearchParams
}

const OrderList = ({ data, statisticData, searchParams }: OrderListProps) => {
    return (
        <div className="space-y-4">
            <OrderListHeader data={data} searchParams={searchParams} />
            <OrderListContent
                data={data}
                statisticData={statisticData}
                searchParams={searchParams}
            />
        </div>
    )
}

export default OrderList
