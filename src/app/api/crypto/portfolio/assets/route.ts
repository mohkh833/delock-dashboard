import { NextRequest, NextResponse } from 'next/server'
import { generatePortfolioAssets } from '@/mock/data/cryptoData'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = searchParams.get('sortOrder') || ''

    let data = generatePortfolioAssets()

    if (sortKey) {
        data = data.sort((a, b) => {
            const aVal = (a as Record<string, unknown>)[sortKey] as number
            const bVal = (b as Record<string, unknown>)[sortKey] as number
            if (sortOrder === 'asc') return aVal > bVal ? 1 : -1
            return aVal < bVal ? 1 : -1
        })
    }

    const total = data.length
    const start = (pageIndex - 1) * pageSize
    const list = data.slice(start, start + pageSize)

    return NextResponse.json({ data: list, total })
}
