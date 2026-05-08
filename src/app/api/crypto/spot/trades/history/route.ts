import { NextResponse } from 'next/server'
import { generateTradeHistory } from '@/mock/data/cryptoData'

export async function GET() {
    const trades = generateTradeHistory()
    return NextResponse.json({ trades })
}
