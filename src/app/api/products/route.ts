import { NextResponse } from 'next/server'
import { getSalesProductList } from '@/services/server/SalesService'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex') || '1'
    const pageSize = searchParams.get('pageSize') || '10'
    const sortOrder = searchParams.get('sortOrder') || ''
    const sortKey = searchParams.get('sortKey') || ''
    const query = searchParams.get('query') || ''

    const response = await getSalesProductList({
        pageIndex,
        pageSize,
        sortOrder,
        sortKey,
        query,
    })

    return NextResponse.json(response)
}
