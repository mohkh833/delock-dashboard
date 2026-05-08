import ApiService from './ApiService'

export async function apiGetProjectMembers<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/projects/scrum-board/members',
        method: 'get',
    })
}

export async function apiGetProjectTask<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/projects/tasks/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetProjectAuditLog<
    T,
    U extends Record<string, unknown>,
>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/projects/audit-log',
        method: 'get',
        params,
    })
}
