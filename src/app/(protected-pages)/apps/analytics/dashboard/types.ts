// Analytics Dashboard Types

export type ArrData = {
    current: number
    changeVsLastMonth: {
        amount: number
        percentage: number
    }
    goalProgress: number
    sparklineData: Array<{
        date: string
        totalMrr: number
        netNewMrr: number
        churnContraction: number
    }>
    forecast: {
        eoyProjected: number
        eoyTarget: number
        variance: number
    }
    currentMrr: number
    mrrVsLastMonth: number
    arrVsLastYear: number
    mrrMovers: {
        newSales: number
        expansion: number
        churn: number
    }
}

export type ChannelsData = {
    trafficDominance: number
    vsLastWeek: number
    channels: Array<{
        name:
            | 'Organic Search'
            | 'Direct'
            | 'Social Media'
            | 'Paid Ads'
            | 'Referral'
        percentage: number
    }>
    metrics: Array<{
        icon: string
        label: string
        value: string
        trend: number
    }>
}

export type CashRunwayData = {
    cashOnHand: number
    burnRate: number
    runway: number
    runwayStatus: 'critical' | 'warning' | 'healthy'
    cashChartData?: Array<{
        label: string
        value: number
    }>
    runwayChartData?: Array<{
        label: string
        value: number
    }>
}

export type NetRevenueRetentionData = {
    current: number
    monthlyData: Array<{
        month: string
        nrr: number
    }>
    target: number
    changeFromLastMonth?: number
    breakdown?: {
        startingArr: number
        expansion: number
        contraction: number
    }
}

export type ChurnData = {
    logoChurn: number
    revenueChurn: number
    logoChurnTarget: number
    revenueChurnTarget: number
    logoChurnChange?: number
    revenueChurnChange?: number
    churnDrivers?: Array<{
        reason: string
        lostMrr: number
        percentageOfTotal: number
    }>
}

export type PlansData = {
    plans: Array<{
        name: string
        monthlyPrice: number
        revenuePercentage: number
        icon: string
    }>
}

export type MrrWaterfallData = {
    startingMrr: number
    newSales: number
    expansion: number
    churn: number
    contraction: number
    endingMrr: number
    netChange: number
}

export type AtRiskAccountsData = {
    accounts: Array<{
        id: string
        companyName: string
        avatar?: string
        healthScore: number
        arr: number
        daysSinceLastLogin: number
        riskLevel: 'critical' | 'warning'
    }>
}

export type PlatformStabilityData = {
    uptime: number
    errorRate: number
    totalRequests: number
    p95ResponseTime: number
    uptimeTrend: number
    errorImpact: number
    utilization: number
    requestBreakdown: {
        successful: { count: number; percentage: number }
        clientErrors: { count: number; percentage: number }
        serverErrors: { count: number; percentage: number }
        totalRequests: number
    }
}

export type LtvCacData = {
    current: number
    monthlyData: Array<{
        month: string
        ratio: number
    }>
    target: number
    explanation: string
}

export type TrialFunnelData = {
    stages: Array<{
        name:
            | 'Website Visitor'
            | 'Trial Signup'
            | 'Activated User'
            | 'Paid Conversion'
            | string
        count: number
        percentage: number
        conversionRate?: number
        color: string
        velocity: number
        dropoffPercentage?: number
    }>
}

export type LeadSourcesData = {
    sources: Array<{
        channel: string
        signups: number
        paidConversions: number
        conversionRate: number
        status: 'above_average' | 'average' | 'below_average'
    }>
    avgConversionRate: number
}

export type AnalyticDashboardData = {
    arr: ArrData
    channels: ChannelsData
    cashRunway: CashRunwayData
    nrr: NetRevenueRetentionData
    churn: ChurnData
    plans: PlansData
    mrrWaterfall: MrrWaterfallData
    atRiskAccounts: AtRiskAccountsData
    platformStability: PlatformStabilityData
    ltvCac: LtvCacData
    trialFunnel: TrialFunnelData
    leadSources: LeadSourcesData
}
