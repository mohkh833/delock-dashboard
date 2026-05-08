export type PortfolioAsset = {
    id: string
    name: string
    symbol: string
    icon: string
    balance: number
    value: number
    priceChange24h: number
    priceChangePercentage24h: number
    allocation: number
}

export type PortfolioOverview = {
    totalValue: number
    tradingBalance: number
    totalChange24h: number
    totalChangePercentage24h: number
}

export type Transaction = {
    id: string
    date: number
    type: 'deposit' | 'withdraw' | 'swap'
    asset: string
    name: string
    icon: string
    amount: number
    value: number
    fee: number
    status: 'completed' | 'pending' | 'failed'
    txHash?: string
}

export type TradeHistory = {
    id: string
    date: number
    type: 'buy' | 'sell' | 'swap'
    asset: string
    name: string
    icon: string
    amount: number
    value: number
    fee: number
    status: 'completed' | 'pending' | 'failed'
    pnlPercentage?: number
    pnlAmount?: number
}

export type ChartDataPoint = {
    timestamp: number
    value: number
}

export type Network = {
    id: string
    name: string
    symbol: string
    fee: number
}

export type AssetsInitialData = {
    overview: PortfolioOverview
    chart: ChartDataPoint[]
    dateRange: string
}
