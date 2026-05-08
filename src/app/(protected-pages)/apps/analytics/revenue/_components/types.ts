export type MetricType = 'mrr' | 'arr' | 'activeSubscriptions' | 'netRevenue'
export type ComparisonMode = 'none' | 'previousPeriod' | 'sameLastYear'
export type DateRangePreset = '7D' | '30D' | '90D' | '1Y'

export type RevenueTrendsData = {
    metrics: {
        mrr: Array<{ date: string; value: number; previousValue?: number }>
        arr: Array<{ date: string; value: number; previousValue?: number }>
        activeSubscriptions: Array<{
            date: string
            value: number
            previousValue?: number
        }>
        netRevenue: Array<{
            date: string
            value: number
            previousValue?: number
        }>
    }
    summary: {
        currentMrr: number
        currentArr: number
        currentActiveSubscriptions: number
        currentNetRevenue: number
        mrrGrowth: number
        arrGrowth: number
        activeSubscriptionsGrowth: number
        netRevenueGrowth: number
    }
}

export type PlanBreakdownData = {
    plan: string
    customers: number
    mrr: number
    arr: number
    percentageOfTotal: number
    growthMoM: number
}

export type RegionBreakdownData = {
    region: string
    customers: number
    mrr: number
    arr: number
    percentageOfTotal: number
    growthMoM: number
}

export type PaymentMethodBreakdownData = {
    paymentMethod: string
    customers: number
    mrr: number
    arr: number
    percentageOfTotal: number
    growthMoM: number
}

export type RevenueBreakdownData = {
    byPlan: Array<PlanBreakdownData>
    byRegion: Array<RegionBreakdownData>
    byPaymentMethod: Array<PaymentMethodBreakdownData>
    totals: {
        totalCustomers: number
        totalMRR: number
        totalARR: number
        overallGrowthMoM: number
    }
}
