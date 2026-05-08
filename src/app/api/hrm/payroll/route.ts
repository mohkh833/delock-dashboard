import { NextResponse } from 'next/server'
import dayjs from 'dayjs'
import {
    generatePayrollData,
    calculatePayrollMetrics,
} from '@/mock/data/hrmData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const month = searchParams.get('month') || dayjs().format('YYYY-MM')
    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 10
    const query = searchParams.get('query') || ''
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = searchParams.get('sortOrder') || ''

    let records = generatePayrollData(month)
    const metrics = calculatePayrollMetrics(records)

    if (query) {
        const q = query.toLowerCase()
        records = records.filter(
            (r) =>
                r.employee.name.toLowerCase().includes(q) ||
                r.employee.department.toLowerCase().includes(q),
        )
    }

    if (sortKey && sortOrder) {
        records = [...records].sort((a, b) => {
            let aVal: string | number = ''
            let bVal: string | number = ''
            switch (sortKey) {
                case 'employee':
                    aVal = a.employee.name
                    bVal = b.employee.name
                    break
                case 'department':
                    aVal = a.employee.department
                    bVal = b.employee.department
                    break
                case 'basicSalary':
                    aVal = a.basicSalary
                    bVal = b.basicSalary
                    break
                case 'allowances':
                    aVal = a.allowances
                    bVal = b.allowances
                    break
                case 'deductions':
                    aVal = a.deductions
                    bVal = b.deductions
                    break
                case 'netPay':
                    aVal = a.netPay
                    bVal = b.netPay
                    break
                case 'status':
                    aVal = a.status
                    bVal = b.status
                    break
            }
            const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
            return sortOrder === 'desc' ? -cmp : cmp
        })
    }

    const total = records.length
    const start = (pageIndex - 1) * pageSize
    const paginated = records.slice(start, start + pageSize)

    return NextResponse.json({ records: paginated, metrics, total })
}
