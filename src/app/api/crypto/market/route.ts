import { NextRequest, NextResponse } from 'next/server'
import { cryptoMarketData } from '@/mock/data/cryptoData'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl

    const pageSize = parseInt(searchParams.get('pageSize') || '50')
    const page = parseInt(searchParams.get('page') || '1')
    const marketType = searchParams.get('marketType')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data = [...(cryptoMarketData as any[])]

    if (marketType && marketType !== 'all') {
        data = data.filter((item) => item.marketType === marketType)
    }

    const total = data.length
    const start = (page - 1) * pageSize
    const paginatedData = data.slice(start, start + pageSize)

    return NextResponse.json({
        data: paginatedData,
        pagination: {
            total,
            page,
            pageSize,
        },
        meta: {
            totalMarketCap: data.reduce((sum, item) => sum + item.marketCap, 0),
            totalVolume24h: data.reduce((sum, item) => sum + item.volume24h, 0),
            marketCapChange24h: 2.4,
        },
    })
}
