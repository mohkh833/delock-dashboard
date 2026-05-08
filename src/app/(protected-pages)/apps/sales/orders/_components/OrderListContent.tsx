import List from './List'
import OrderListStatistic from './OrderListStatistic'
import OderrListStatusTab from './OderrListStatusTab'
import OrderListTableTools from './OrderListTableTools'
import type {
    GetOrderListResponse,
    GetOrderStatisticsResponse,
    OrderListSearchParams,
} from './types'

const OrderListContent = ({
    data,
    statisticData,
    searchParams,
}: {
    data: GetOrderListResponse
    statisticData: GetOrderStatisticsResponse
    searchParams: OrderListSearchParams
}) => {
    return (
        <>
            <OrderListStatistic statisticData={statisticData} />
            <OderrListStatusTab searchParams={searchParams} />
            <OrderListTableTools searchParams={searchParams} />
            <List data={data} searchParams={searchParams} />
        </>
    )
}

export default OrderListContent
