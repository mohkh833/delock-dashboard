import { NextResponse } from 'next/server'
import { getTradeExecutions } from '@/mock/data/cryptoData'

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ pair: string }> },
) {
    const { pair } = await params
    const trades = getTradeExecutions(pair)
    return NextResponse.json({ trades })
}
