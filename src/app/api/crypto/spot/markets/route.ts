import { NextResponse } from 'next/server'
import { spotTradingPairs } from '@/mock/data/cryptoData'

export async function GET() {
    return NextResponse.json({ markets: spotTradingPairs })
}
