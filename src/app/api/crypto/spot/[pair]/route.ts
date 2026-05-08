import { NextResponse } from 'next/server'
import { getSpotTradingData } from '@/mock/data/cryptoData'

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ pair: string }> },
) {
    const { pair } = await params
    const data = getSpotTradingData(pair)
    return NextResponse.json(data)
}
