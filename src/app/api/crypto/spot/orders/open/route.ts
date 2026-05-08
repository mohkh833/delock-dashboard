import { NextResponse } from 'next/server'
import { getOpenOrdersByPair } from '@/mock/data/cryptoData'

export async function GET() {
    const orders = getOpenOrdersByPair()
    return NextResponse.json({ orders })
}
