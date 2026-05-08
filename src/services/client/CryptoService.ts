import ApiService from './ApiService'

export async function apiGetMarketData<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/market',
        method: 'get',
        params,
    })
}

export async function apiGetFiatCurrencies<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/fiat-currencies',
        method: 'get',
    })
}

export async function apiGetSpotTradingData<T>(pair: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/crypto/spot/${pair}`,
        method: 'get',
    })
}

export async function apiGetOrderBook<T>(pair: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/crypto/spot/${pair}/orderbook`,
        method: 'get',
    })
}

export async function apiGetRecentTrades<T>(pair: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/crypto/spot/${pair}/trades`,
        method: 'get',
    })
}

export async function apiGetSpotMarketList<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/spot/markets',
        method: 'get',
    })
}

export async function apiGetSpotChartData<T>(pair: string, timeframe: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/crypto/spot/${pair}/chart`,
        method: 'get',
        params: { timeframe },
    })
}

export async function apiGetOpenOrders<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/spot/orders/open',
        method: 'get',
    })
}

export async function apiGetOrderHistory<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/spot/orders/history',
        method: 'get',
    })
}

export async function apiGetTradeHistory<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/spot/trades/history',
        method: 'get',
    })
}

export async function apiGetPortfolioOverview<T>(
    params?: Record<string, unknown>,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/portfolio/overview',
        method: 'get',
        params,
    })
}

export async function apiGetPortfolioChart<T>(params: { dateRange: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/portfolio/chart',
        method: 'get',
        params,
    })
}

export async function apiGetPortfolioAssets<T>(
    params?: Record<string, unknown>,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/portfolio/assets',
        method: 'get',
        params,
    })
}

export async function apiGetPortfolioTransactions<T>(
    params?: Record<string, unknown>,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/portfolio/transactions',
        method: 'get',
        params,
    })
}

export async function apiGetPortfolioTrades<T>(
    params?: Record<string, unknown>,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/portfolio/trades',
        method: 'get',
        params,
    })
}

export async function apiGetAvailableNetworks<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/crypto/networks',
        method: 'get',
    })
}

export async function apiGetDepositAddress<T>(network: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/crypto/deposit/address/${network}`,
        method: 'get',
    })
}
