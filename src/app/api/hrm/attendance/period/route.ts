import { NextResponse } from 'next/server'
import { generatePeriodAttendanceData } from '@/mock/data/hrmData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const startDate = searchParams.get('startDate') || ''
    const endDate = searchParams.get('endDate') || ''
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const query = searchParams.get('query') || ''
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = searchParams.get('sortOrder') || ''

    if (!startDate || !endDate) {
        return NextResponse.json({ data: [], total: 0 })
    }

    let data = generatePeriodAttendanceData(startDate, endDate)

    if (query) {
        const q = query.toLowerCase()
        data = data.filter(
            (r) =>
                r.employee.name.toLowerCase().includes(q) ||
                r.employee.department.toLowerCase().includes(q),
        )
    }

    if (sortKey && sortOrder) {
        data = [...data].sort((a, b) => {
            let aVal: string | number = ''
            let bVal: string | number = ''
            switch (sortKey) {
                case 'employee':
                    aVal = a.employee.name
                    bVal = b.employee.name
                    break
                case 'presentPercentage':
                    aVal = a.presentPercentage
                    bVal = b.presentPercentage
                    break
                default:
                    aVal = a.employee.name
                    bVal = b.employee.name
            }
            if (sortOrder === 'desc') return bVal > aVal ? 1 : -1
            return aVal > bVal ? 1 : -1
        })
    }

    const total = data.length
    const start = (pageIndex - 1) * pageSize
    const paginated = data.slice(start, start + pageSize)

    return NextResponse.json({ data: paginated, total })
}
