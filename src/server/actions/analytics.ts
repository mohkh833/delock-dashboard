'use server'
import {
    analyticDashboardData,
    generateMockForecastData,
    generateAllRevenueTrendsData,
    generateRevenueBreakdownData,
    generateSubscriberTrendsData,
    generateLifecycleData,
    generateSubscriberPersonasData,
    generateUnifiedReportData,
} from '@/mock/data/analyticData'
import type { UnifiedReportRow } from '@/mock/data/analyticData'
import sleep from '@/utils/sleep'

type DateRange = {
    startDate: Date
    endDate: Date
}

function computeForecastDateRange(preset: string): DateRange {
    const now = new Date()
    let endDate = new Date(now)

    switch (preset) {
        case 'next-3-month':
            endDate = new Date(now)
            endDate.setMonth(endDate.getMonth() + 3)
            break
        case 'next-12-month':
            endDate = new Date(now)
            endDate.setMonth(endDate.getMonth() + 12)
            break
        case 'next-6-month':
        default:
            endDate = new Date(now)
            endDate.setMonth(endDate.getMonth() + 6)
            break
    }

    return { startDate: now, endDate }
}

function computeRevenueDateRange(preset: string): DateRange {
    const now = new Date()
    const startDate = new Date(now)

    switch (preset) {
        case '7D':
            startDate.setDate(startDate.getDate() - 7)
            break
        case '90D':
            startDate.setDate(startDate.getDate() - 90)
            break
        case '1Y':
            startDate.setFullYear(startDate.getFullYear() - 1)
            break
        case '30D':
        default:
            startDate.setDate(startDate.getDate() - 30)
            break
    }

    return { startDate, endDate: now }
}

function computeSubscriptionDateRange(preset: string): DateRange {
    const now = new Date()
    const startDate = new Date(now)

    switch (preset) {
        case '90D':
            startDate.setDate(startDate.getDate() - 90)
            break
        case '180D':
            startDate.setDate(startDate.getDate() - 180)
            break
        case '1Y':
            startDate.setFullYear(startDate.getFullYear() - 1)
            break
        case '30D':
        default:
            startDate.setDate(startDate.getDate() - 30)
            break
    }

    return { startDate, endDate: now }
}

export async function getAnalyticDashboard() {
    await sleep(200)
    return analyticDashboardData
}

export async function getForecastData(params: {
    scenario: string
    dateRange: string
}) {
    const dateRange = computeForecastDateRange(
        params.dateRange || 'next-6-month',
    )
    const scenario = (params.scenario || 'expected') as
        | 'best-case'
        | 'expected'
        | 'worst-case'

    return generateMockForecastData(dateRange, scenario)
}

export async function getRevenueData(params: {
    preset?: string
    metric?: string
    comparison?: string
}) {
    const dateRange = computeRevenueDateRange(params.preset || '30D')
    const includeComparison = params.comparison !== 'none'
    const comparisonType = (
        params.comparison === 'previousPeriod'
            ? 'previousPeriod'
            : 'sameLastYear'
    ) as 'previousPeriod' | 'sameLastYear'

    const trends = generateAllRevenueTrendsData(
        dateRange,
        includeComparison,
        comparisonType,
    )
    const breakdown = generateRevenueBreakdownData(dateRange)

    return { trends, breakdown }
}

export async function getSubscriptionData(params: { preset?: string }) {
    const dateRange = computeSubscriptionDateRange(params.preset || '30D')

    const trendsData = generateSubscriberTrendsData(dateRange)
    const lifecycle = generateLifecycleData(dateRange)
    const personas = generateSubscriberPersonasData(dateRange)

    return {
        trends: trendsData.trends,
        metrics: trendsData.metrics,
        lifecycle,
        personas,
    }
}

export async function getReportsData(params: {
    query?: string
    pageIndex?: number
    pageSize?: number
    sortKey?: string
    sortOrder?: string
}) {
    const now = new Date()
    const startDate = new Date(now)
    startDate.setFullYear(startDate.getFullYear() - 1)

    let data: UnifiedReportRow[] = generateUnifiedReportData({
        startDate,
        endDate: now,
    })

    if (params.query) {
        const q = params.query.toLowerCase()
        data = data.filter(
            (row) =>
                row.customer?.toLowerCase().includes(q) ||
                row.email?.toLowerCase().includes(q) ||
                row.plan?.toLowerCase().includes(q) ||
                row.status?.toLowerCase().includes(q),
        )
    }

    if (params.sortKey && params.sortOrder) {
        const key = params.sortKey as keyof UnifiedReportRow
        const order = params.sortOrder === 'asc' ? 1 : -1
        data = [...data].sort((a, b) => {
            const aVal = a[key]
            const bVal = b[key]
            if (aVal == null && bVal == null) return 0
            if (aVal == null) return order
            if (bVal == null) return -order
            if (typeof aVal === 'string' && typeof bVal === 'string') {
                return aVal.localeCompare(bVal) * order
            }
            if (typeof aVal === 'number' && typeof bVal === 'number') {
                return (aVal - bVal) * order
            }
            return 0
        })
    }

    const total = data.length
    const pageIndex = params.pageIndex || 1
    const pageSize = params.pageSize || 10
    const start = (pageIndex - 1) * pageSize
    const list = data.slice(start, start + pageSize)

    return { list, total, pageIndex, pageSize }
}
