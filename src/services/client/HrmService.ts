import ApiService from './ApiService'

export async function apiGetHrmDashboard<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/dashboard',
        method: 'get',
    })
}

export async function apiGetEmployees<T>(params: Record<string, unknown>) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/employees',
        method: 'get',
        params,
    })
}

export async function apiGetEmployee<T>(id: string) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/hrm/employees/${id}`,
        method: 'get',
    })
}

export async function apiGetDepartments<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/departments',
        method: 'get',
    })
}

export async function apiGetRolesByDepartments<T>(departments: string[]) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/roles',
        method: 'get',
        params: { departments: departments.join(',') },
    })
}

export async function apiGetAttendanceData<T>(params: Record<string, unknown>) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/attendance',
        method: 'get',
        params,
    })
}

export async function apiGetPeriodAttendanceData<T>(
    params: Record<string, unknown>,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/attendance/period',
        method: 'get',
        params,
    })
}

export async function apiGetPayrollData<T>(params: Record<string, unknown>) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/payroll',
        method: 'get',
        params,
    })
}

export async function apiGetLeaveCalendarEvents<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/leaves/calendar',
        method: 'get',
    })
}

export async function apiGetLeaveStatistics<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/leaves/statistics',
        method: 'get',
    })
}

export async function apiGetLeaveRequests<T>(params?: Record<string, unknown>) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/leaves/requests',
        method: 'get',
        params,
    })
}

export async function apiGetEmployeeLeaveDetail<T>(params: {
    employeeId: string
    eventId: string
}) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/hrm/leaves/detail',
        method: 'get',
        params,
    })
}
