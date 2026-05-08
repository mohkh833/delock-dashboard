export type DateRangePreset = '30D' | '90D' | '180D' | '1Y'

export type SubscriberTrend = {
    date: string
    newSubscribers: number
    unsubscribers: number
    netGrowth: number
}

export type SubscriberMetrics = {
    totalSubscribers: number
    totalGrowth: number
    avgMonthlyGrowth: number
    churnRate: number
    activeSubscribers: {
        value: number
        percentage: number
        total: number
    }
    newSubscribers: {
        value: number
        percentage: number
        total: number
    }
    churnedSubscribers: {
        value: number
        percentage: number
        total: number
    }
}

export type LifecycleStage =
    | 'trial'
    | 'active'
    | 'engaged'
    | 'churned'
    | 'reactivated'

export type LifecycleStageData = {
    stage: LifecycleStage
    count: number
    percentage: number
    trend: 'up' | 'down' | 'neutral'
}

export type EngagementLevel = 'low' | 'medium' | 'high'

export type SubscriptionPlan = 'Basic' | 'Pro' | 'Enterprise'

export type SubscriberPersona = {
    id: string
    name: string
    email: string
    img?: string
    plan: SubscriptionPlan
    subscribeDuration: string
    accumulatedAmount: number
    avgPageViews: number
    engagement: EngagementLevel
    joinDate: string
    lastActive: string
    isHighValue: boolean
    isRecent: boolean
}

export type SubscriberPersonasData = {
    recent: SubscriberPersona[]
    highValue: SubscriberPersona[]
}
