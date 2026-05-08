import { NextResponse } from 'next/server'
import { generateOrderHistory } from '@/mock/data/cryptoData'

export async function GET() {
    const orders = generateOrderHistory()
    return NextResponse.json({ orders })
}
