import OrderList from './_components/OrderList'
import {
    getSalesOrderList,
    getSalesOrderStatistics,
} from '@/server/actions/sales'
import Container from '@/components/shared/Container'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function OrderListPage(props: {
    searchParams: SearchParams
}) {
    const searchParams = await props.searchParams

    const params = {
        pageIndex: searchParams.pageIndex ? Number(searchParams.pageIndex) : 1,
        pageSize: searchParams.pageSize ? Number(searchParams.pageSize) : 10,
        sortKey: (searchParams.sortKey as string) || 'date',
        sortOrder: (searchParams.sortOrder as string) || 'desc',
        query: (searchParams.query as string) || '',
        paymentStatus: (searchParams.paymentStatus as string) || '',
        range: (searchParams.range as string) || '30',
    }

    const data = await getSalesOrderList(params)
    const statisticData = await getSalesOrderStatistics()

    return (
        <Container>
            <OrderList
                data={data}
                statisticData={statisticData}
                searchParams={params}
            />
        </Container>
    )
}
