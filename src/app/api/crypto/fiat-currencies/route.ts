import { NextResponse } from 'next/server'
import { fiatCurrencies } from '@/mock/data/cryptoData'

export async function GET() {
    return NextResponse.json({ data: fiatCurrencies })
}
