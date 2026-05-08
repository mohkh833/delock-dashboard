'use server'
import {
    getCryptoDashboardData,
    cryptoMarketData,
    marketStatistics,
    coinDetailsData,
    chartDataSets,
    newsArticlesData,
    generatePortfolioOverview,
    generatePortfolioChart,
} from '@/mock/data/cryptoData'
import sleep from '@/utils/sleep'

export async function getCryptoDashboard() {
    await sleep(300)
    return getCryptoDashboardData()
}

type GetMarketDataParams = {
    pageIndex?: number
    pageSize?: number
    sortKey?: string
    sortOrder?: string
    marketType?: string
    search?: string
    changeFilter?: string
    volumeFilter?: string
    priceFilter?: string
}

export async function getMarketData(params: GetMarketDataParams = {}) {
    await sleep(300)

    const {
        pageIndex = 1,
        pageSize = 20,
        sortKey = 'marketCap',
        sortOrder = 'desc',
        marketType = 'all',
        search = '',
        changeFilter = 'all',
        volumeFilter = '',
        priceFilter = '',
    } = params

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data = [...(cryptoMarketData as any[])]

    if (marketType && marketType !== 'all') {
        data = data.filter(
            (item) =>
                item.marketType === marketType || item.marketType === 'all',
        )
    }

    if (search) {
        const q = search.toLowerCase()
        data = data.filter(
            (item) =>
                item.name.toLowerCase().includes(q) ||
                item.symbol.toLowerCase().includes(q),
        )
    }

    if (changeFilter === 'gainers') {
        data = data.filter((item) => item.priceChangePercentage24h > 0)
    } else if (changeFilter === 'losers') {
        data = data.filter((item) => item.priceChangePercentage24h < 0)
    }

    if (volumeFilter) {
        const filters = volumeFilter.split(',').filter(Boolean)
        if (filters.length > 0 && !filters.includes('all')) {
            data = data.filter((item) =>
                filters.some((f: string) => {
                    if (f === '1mto10m')
                        return item.volume24h >= 1e6 && item.volume24h < 10e6
                    if (f === '10mto50m')
                        return item.volume24h >= 10e6 && item.volume24h < 50e6
                    if (f === '50mto100m')
                        return item.volume24h >= 50e6 && item.volume24h < 100e6
                    if (f === '100mAbove') return item.volume24h >= 100e6
                    return false
                }),
            )
        }
    }

    if (priceFilter) {
        const filters = priceFilter.split(',').filter(Boolean)
        if (filters.length > 0 && !filters.includes('all')) {
            data = data.filter((item) =>
                filters.some((f: string) => {
                    if (f === 'under1') return item.price < 1
                    if (f === '1to100')
                        return item.price >= 1 && item.price < 100
                    if (f === '100to1000')
                        return item.price >= 100 && item.price < 1000
                    if (f === 'over1000') return item.price >= 1000
                    return false
                }),
            )
        }
    }

    if (sortKey) {
        data = data.sort(
            (a: Record<string, unknown>, b: Record<string, unknown>) => {
                const aVal = (a[sortKey] as number) ?? 0
                const bVal = (b[sortKey] as number) ?? 0
                if (sortOrder === 'asc') return aVal > bVal ? 1 : -1
                return aVal < bVal ? 1 : -1
            },
        )
    }

    const total = data.length
    const start = (pageIndex - 1) * pageSize
    const list = data.slice(start, start + pageSize)

    return {
        data: list,
        pagination: { total, pageIndex, pageSize },
        meta: {
            totalMarketCap: data.reduce(
                (s: number, i: { marketCap: number }) => s + i.marketCap,
                0,
            ),
            totalVolume24h: data.reduce(
                (s: number, i: { volume24h: number }) => s + i.volume24h,
                0,
            ),
            marketCapChange24h: 2.4,
        },
    }
}

export async function getMarketStatistics() {
    await sleep(200)
    return marketStatistics
}

export async function getCoinPageData(coinId: string) {
    await sleep(300)
    const details = coinDetailsData(coinId)
    const chartData = chartDataSets(coinId)
    const news = newsArticlesData(coinId)
    return { details, chartData, news }
}

export async function getCryptoAssetsInitialData(dateRange = '1m') {
    await sleep(300)
    const overview = generatePortfolioOverview(dateRange)
    const chart = generatePortfolioChart(dateRange)
    return { overview, chart, dateRange }
}
