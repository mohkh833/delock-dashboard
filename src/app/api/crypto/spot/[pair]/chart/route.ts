import { NextResponse } from 'next/server'
import { getSpotChartData } from '@/mock/data/cryptoData'
import type { ChartTimeRange } from '@/mock/data/cryptoData'

export async function GET(
    req: Request,
    { params }: { params: Promise<{ pair: string }> },
) {
    const { pair } = await params
    const { searchParams } = new URL(req.url)
    const timeframe = (searchParams.get('timeframe') || '1h') as ChartTimeRange
    const data = getSpotChartData(pair, timeframe)
    return NextResponse.json({ data, timeRange: timeframe })
}
