import { auditLogData } from '@/mock/data/logData'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
    const { searchParams } = request.nextUrl
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const query = searchParams.get('query') || ''
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = searchParams.get('sortOrder') || ''
    const rangeStart = searchParams.get('range[0]')
    const rangeEnd = searchParams.get('range[1]')

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data = [...(auditLogData as any[])]

    if (query) {
        const q = query.toLowerCase()
        data = data.filter(
            (log) =>
                log.actor?.name?.toLowerCase().includes(q) ||
                log.action?.toLowerCase().includes(q),
        )
    }

    if (rangeStart && rangeEnd) {
        const start = new Date(rangeStart).getTime()
        const end = new Date(rangeEnd).getTime()
        data = data.filter((log) => {
            const ts = new Date(log.timestamp).getTime()
            return ts >= start && ts <= end
        })
    }

    if (sortKey && sortOrder) {
        data.sort((a, b) => {
            const aVal = a[sortKey] ?? ''
            const bVal = b[sortKey] ?? ''
            const cmp = String(aVal).localeCompare(String(bVal))
            return sortOrder === 'desc' ? -cmp : cmp
        })
    }

    const total = data.length
    const start = (pageIndex - 1) * pageSize
    const list = data.slice(start, start + pageSize)

    return NextResponse.json({ list, total })
}
