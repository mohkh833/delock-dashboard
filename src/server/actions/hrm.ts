'use server'
import dayjs from 'dayjs'
import {
    generateHrmDashboardData,
    getEmployeesByStatus,
    generateAttendanceData,
    calculateAttendanceMetrics,
    generatePayrollData,
    calculatePayrollMetrics,
    leaveCalendarEvents,
    leaveStatistics,
    leaveRequests,
    employeeLeaveDetails,
    announcements,
    announcementCategories,
    pinnedAnnouncements,
} from '@/mock/data/hrmData'

export async function getHrmDashboardData() {
    return generateHrmDashboardData()
}

type EmployeeListParams = {
    pageIndex?: number
    pageSize?: number
    query?: string
    sortKey?: string
    sortOrder?: string
    status?: string
    employmentTypes?: string
    departments?: string
    roles?: string
}

export async function getHrmEmployeesInitialData(params: EmployeeListParams) {
    const {
        pageIndex = 1,
        pageSize = 20,
        query = '',
        sortKey = '',
        sortOrder = 'asc',
        status = 'active',
        employmentTypes = '',
        departments = '',
        roles = '',
    } = params

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

    return { employees: paginated, total }
}

type AttendanceParams = {
    date?: string
    pageIndex?: number
    pageSize?: number
    query?: string
    status?: string
    sortKey?: string
    sortOrder?: string
}

export async function getAttendanceInitialData(params: AttendanceParams) {
    const {
        date = dayjs().format('YYYY-MM-DD'),
        pageIndex = 1,
        pageSize = 10,
        query = '',
        status = '',
        sortKey = '',
        sortOrder = '',
    } = params

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

    return { records: paginated, metrics, total }
}

type PayrollParams = {
    month?: string
    pageIndex?: number
    pageSize?: number
    query?: string
    sortKey?: string
    sortOrder?: string
}

export async function getPayrollInitialData(params: PayrollParams) {
    const {
        month = dayjs().format('YYYY-MM'),
        pageIndex = 1,
        pageSize = 10,
        query = '',
        sortKey = '',
        sortOrder = '',
    } = params

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

    return { records: paginated, metrics, total }
}

export async function getLeaveInitialData() {
    return {
        calendarEvents: leaveCalendarEvents,
        statistics: leaveStatistics,
        leaveRequests,
        employeeLeaveDetails,
    }
}

export async function getAnnouncementsInitialData() {
    return {
        announcements,
        categories: announcementCategories,
        pinnedAnnouncements,
    }
}
