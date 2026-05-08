import { getMarketData, getMarketStatistics } from '@/server/actions/crypto'
import MarketPage from './_components/MarketPage'
import type { GetMarketDataResponse, MarketStatistics } from './types'

export default async function MarketPageRoute(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams

    const [data, statistics] = await Promise.all([
        getMarketData({
            pageIndex: Number(searchParams.pageIndex) || 1,
            pageSize: Number(searchParams.pageSize) || 20,
            sortKey: (searchParams.sortKey as string) || 'marketCap',
            sortOrder: (searchParams.sortOrder as string) || 'desc',
            marketType: (searchParams.tab as string) || 'all',
            search: (searchParams.search as string) || '',
            changeFilter: (searchParams.changeFilter as string) || 'all',
            volumeFilter: (searchParams.volumeFilter as string) || '',
            priceFilter: (searchParams.priceFilter as string) || '',
        }),
        getMarketStatistics(),
    ])

    return (
        <MarketPage
            data={data as GetMarketDataResponse}
            statistics={statistics as MarketStatistics}
        />
    )
}
