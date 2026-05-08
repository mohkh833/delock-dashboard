import { NextResponse } from 'next/server'
import dayjs from 'dayjs'
import {
    generateAttendanceData,
    calculateAttendanceMetrics,
} from '@/mock/data/hrmData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date') || dayjs().format('YYYY-MM-DD')
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '10')
    const query = searchParams.get('query') || ''
    const status = searchParams.get('status') || ''
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = searchParams.get('sortOrder') || ''

    let records = generateAttendanceData(date)
    const metrics = calculateAttendanceMetrics(records)

    if (status && status !== 'all') {
        records = records.filter((r) => r.status === status)
    }

    if (query) {
        const q = query.toLowerCase()
        records = records.filter(
            (r) =>
                r.employee.name.toLowerCase().includes(q) ||
                r.employee.department.toLowerCase().includes(q) ||
                r.employee.role.toLowerCase().includes(q),
        )
    }

    if (sortKey && sortOrder) {
        records = [...records].sort((a, b) => {
            let aVal: string = ''
            let bVal: string = ''
            switch (sortKey) {
                case 'employee':
                    aVal = a.employee.name
                    bVal = b.employee.name
                    break
                case 'department':
                    aVal = a.employee.department
                    bVal = b.employee.department
                    break
                case 'checkIn':
                    aVal = a.checkIn || '99:99'
                    bVal = b.checkIn || '99:99'
                    break
                case 'checkOut':
                    aVal = a.checkOut || '00:00'
                    bVal = b.checkOut || '00:00'
                    break
                case 'status':
                    aVal = a.status
                    bVal = b.status
                    break
                default:
                    aVal = a.employee.name
                    bVal = b.employee.name
            }
            if (sortOrder === 'desc') return bVal > aVal ? 1 : -1
            return aVal > bVal ? 1 : -1
        })
    }

    const total = records.length
    const start = (pageIndex - 1) * pageSize
    const paginated = records.slice(start, start + pageSize)

    return NextResponse.json({ records: paginated, metrics, total })
}
