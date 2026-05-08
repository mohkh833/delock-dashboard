/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from 'next/server'
import { generateCompleteDashboardData } from '@/mock/data/salesData'
import sleep from '@/utils/sleep'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const timeRange = searchParams.get('timeRange') || 'thisMonth'
    const comparisonPeriod = searchParams.get('comparisonPeriod') || 'lastMonth'
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''
    const comparisonStartDate = searchParams.get('comparisonStartDate') || ''
    const comparisonEndDate = searchParams.get('comparisonEndDate') || ''

    const dynamicDashboardData = generateCompleteDashboardData(
        startDate,
        endDate,
        comparisonStartDate,
        comparisonEndDate,
        timeRange as any,
        comparisonPeriod as any,
    )

    await sleep(200)

    return NextResponse.json({
        success: true,
        data: dynamicDashboardData,
        meta: {
            timeRange,
            comparisonPeriod,
            startDate,
            endDate,
            comparisonStartDate,
            comparisonEndDate,
            generatedAt: new Date().toISOString(),
        },
    })
}
