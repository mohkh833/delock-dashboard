import { NextResponse } from 'next/server'
import { getOrderBookData } from '@/mock/data/cryptoData'

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ pair: string }> },
) {
    const { pair } = await params
    const data = getOrderBookData(pair)
    return NextResponse.json(data)
}
