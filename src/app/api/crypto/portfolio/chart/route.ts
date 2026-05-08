import { NextRequest, NextResponse } from 'next/server'
import { generatePortfolioChart } from '@/mock/data/cryptoData'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const dateRange = searchParams.get('dateRange') || '1m'
    const data = generatePortfolioChart(dateRange)
    return NextResponse.json({ data, dateRange })
}
