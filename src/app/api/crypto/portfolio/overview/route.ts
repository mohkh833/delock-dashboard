import { NextRequest, NextResponse } from 'next/server'
import { generatePortfolioOverview } from '@/mock/data/cryptoData'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const dateRange = searchParams.get('dateRange') || '1m'
    const data = generatePortfolioOverview(dateRange)
    return NextResponse.json(data)
}
