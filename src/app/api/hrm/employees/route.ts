import { NextResponse } from 'next/server'
import { getEmployeesByStatus } from '@/mock/data/hrmData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const pageIndex = parseInt(searchParams.get('pageIndex') || '1')
    const pageSize = parseInt(searchParams.get('pageSize') || '20')
    const query = searchParams.get('query') || ''
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = searchParams.get('sortOrder') || 'asc'
    const status = searchParams.get('status') || 'active'
    const employmentTypes = searchParams.get('employmentTypes') || ''
    const departments = searchParams.get('departments') || ''
    const roles = searchParams.get('roles') || ''

    let employees = getEmployeesByStatus(status)

    if (query) {
        const q = query.toLowerCase()
        employees = employees.filter(
            (emp) =>
                emp.personalInfo.fullName.toLowerCase().includes(q) ||
                emp.personalInfo.email.toLowerCase().includes(q) ||
                emp.employeeId.toLowerCase().includes(q),
        )
    }

    if (employmentTypes) {
        const types = employmentTypes.split(',').filter(Boolean)
        if (types.length > 0) {
            employees = employees.filter((emp) =>
                types.includes(emp.jobInfo.employmentType),
            )
        }
    }

    if (departments) {
        const depts = departments.split(',').filter(Boolean)
        if (depts.length > 0) {
            employees = employees.filter((emp) =>
                depts.includes(emp.jobInfo.department),
            )
        }
    }

    if (roles) {
        const roleList = roles.split(',').filter(Boolean)
        if (roleList.length > 0) {
            employees = employees.filter((emp) =>
                roleList.includes(emp.jobInfo.role),
            )
        }
    }

    if (sortKey) {
        employees = [...employees].sort((a, b) => {
            let aVal: string | number = ''
            let bVal: string | number = ''

            switch (sortKey) {
                case 'employeeId':
                    aVal = a.employeeId
                    bVal = b.employeeId
                    break
                case 'name':
                    aVal = a.personalInfo.fullName
                    bVal = b.personalInfo.fullName
                    break
                case 'department':
                    aVal = a.jobInfo.department
                    bVal = b.jobInfo.department
                    break
                case 'role':
                    aVal = a.jobInfo.role
                    bVal = b.jobInfo.role
                    break
                case 'employmentType':
                    aVal = a.jobInfo.employmentType
                    bVal = b.jobInfo.employmentType
                    break
                case 'currentStatus':
                    aVal = a.accountInfo.currentStatus
                    bVal = b.accountInfo.currentStatus
                    break
                case 'joiningDate':
                    aVal = a.jobInfo.joiningDate
                    bVal = b.jobInfo.joiningDate
                    break
            }

            const cmp = aVal < bVal ? -1 : aVal > bVal ? 1 : 0
            return sortOrder === 'desc' ? -cmp : cmp
        })
    }

    const total = employees.length
    const start = (pageIndex - 1) * pageSize
    const paginated = employees.slice(start, start + pageSize)

    return NextResponse.json({ employees: paginated, total })
}
