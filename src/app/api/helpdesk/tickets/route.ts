import { NextRequest, NextResponse } from 'next/server'
import { helpdeskTicketData } from '@/mock/data/ticketsData'
import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl

    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const sortOrder = searchParams.get('sortOrder')
    const sortKey = searchParams.get('sortKey')
    const query = searchParams.get('query')

    const status = searchParams.getAll('status')
    const priority = searchParams.getAll('priority')
    const category = searchParams.getAll('category')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tickets = [...helpdeskTicketData] as any[]

    let data = tickets
    let total = tickets.length

    if (status && status.length > 0) {
        data = data.filter((item) => status.includes(item.status))
    }

    if (priority && priority.length > 0) {
        data = data.filter((item) => priority.includes(item.priority))
    }

    if (category && category.length > 0) {
        data = data.filter((item) => category.includes(item.category))
    }

    if (sortKey && sortOrder) {
        if (sortKey !== 'totalSpending') {
            data.sort(
                sortBy(sortKey, sortOrder === 'desc', (a) =>
                    (a as string).toUpperCase(),
                ),
            )
        } else {
            data.sort(sortBy(sortKey, sortOrder === 'desc', parseInt as Primer))
        }
    }

    if (query) {
        data = wildCardSearch(data, query)
        total = data.length
    }

    data = paginate(data, pageSize, pageIndex)

    const responseData = {
        list: data,
        total: total,
    }

    return NextResponse.json(responseData)
}
