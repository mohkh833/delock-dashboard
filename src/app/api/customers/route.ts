import { NextResponse } from 'next/server'
import { getCustomersList } from '@/server/actions/customers'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const pageIndex = searchParams.get('pageIndex') || 1
    const pageSize = searchParams.get('pageSize') || 10
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = searchParams.get('sortOrder') || ''
    const query = searchParams.get('query') || ''
    const status = searchParams.get('status') || ''
    const customerLabel = searchParams.get('customerLabel') || ''

    const data = await getCustomersList({
        pageIndex,
        pageSize,
        sortKey,
        sortOrder,
        query,
        status,
        customerLabel,
    })

    return NextResponse.json(data)
}
