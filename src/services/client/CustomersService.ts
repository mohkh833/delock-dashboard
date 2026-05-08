import ApiService from './ApiService'

export async function apiGetCustomersList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/customers',
        method: 'get',
        params,
    })
}

export async function apiGetCustomer<T, U extends Record<string, unknown>>({
    id,
    ...params
}: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: `/customers/${id}`,
        method: 'get',
        params,
    })
}

export async function apiGetAssignees<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/customers/assignees',
        method: 'get',
    })
}

export async function apiGetHelpdeskTickets<
    T,
    U extends Record<string, unknown>,
>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/helpdesk/tickets',
        method: 'get',
        params,
    })
}
