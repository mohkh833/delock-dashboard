import { NextResponse } from 'next/server'
import { getAvailableNetworks } from '@/mock/data/cryptoData'

export async function GET() {
    const networks = getAvailableNetworks()
    return NextResponse.json({ data: networks })
}
