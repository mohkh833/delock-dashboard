import type { Currency, TimeHorizon, RevenueDataPoint } from '../types'

const CURRENCY_RATES = {
    USD: 1,
    EUR: 0.92,
}

export const convertCurrency = (
    amount: number,
    targetCurrency: Currency,
): number => {
    return amount * CURRENCY_RATES[targetCurrency]
}

export const formatCurrency = (
    amount: number,
    currency: Currency = 'USD',
): string => {
    const symbols = { USD: '$', EUR: '€' }
    const formatted = new Intl.NumberFormat('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount)
    return `${symbols[currency]}${formatted}`
}

export const formatPercentage = (
    value: number,
    decimals: number = 1,
): string => {
    return `${value.toFixed(decimals)}%`
}

export const calculatePercentageChange = (
    current: number,
    previous: number,
): number => {
    if (previous === 0) return 0
    return ((current - previous) / previous) * 100
}

export const filterRevenueByHorizon = (
    data: RevenueDataPoint[],
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _horizon: TimeHorizon,
): RevenueDataPoint[] => {
    return data
}

export const calculateConversionRate = (
    currentCount: number,
    nextCount: number,
): number => {
    if (currentCount === 0) return 0
    return (nextCount / currentCount) * 100
}

export const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'B'
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M'
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K'
    return num.toString()
}

export const calculateOverdueDays = (dueDate: string): number => {
    const due = new Date(dueDate)
    const now = new Date()
    const diffTime = now.getTime() - due.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > 0 ? diffDays : 0
}

export const getPriorityColor = (
    priority: 'urgent' | 'medium' | 'low',
): string => {
    const colors = {
        urgent: 'border-error',
        medium: 'border-warning',
        low: 'border-success',
    }
    return colors[priority]
}

export const getWinRateColor = (
    winRate: number,
    target: number,
): { fill: string; text: string } => {
    if (winRate >= target)
        return { fill: 'stroke-success', text: 'text-success' }
    if (winRate >= target * 0.9)
        return { fill: 'stroke-warning', text: 'text-warning' }
    return { fill: 'stroke-error', text: 'text-error' }
}

export const truncateText = (text: string, maxLength: number): string => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
}
