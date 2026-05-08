import ApiService from './ApiService'

export async function apiGetActivityLogs<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/activity-logs',
        method: 'get',
        params,
    })
}

export async function apiGetSettingsProfile<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/settings/profile',
        method: 'get',
    })
}

export async function apiGetSettingsSecurity<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/settings/security',
        method: 'get',
    })
}

export async function apiGetSettingsNotification<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/settings/notification',
        method: 'get',
    })
}

export async function apiGetSettingsBilling<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/settings/billing',
        method: 'get',
    })
}

export async function apiGetSettingsIntegration<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/settings/integration',
        method: 'get',
    })
}

export async function apiSendInvitation<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/referrals/invite',
        method: 'post',
        data,
    })
}

// ---- Access Control / RBAC ----

export async function apiGetUsersList<T, U extends Record<string, unknown>>(
    params: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/rbac/users',
        method: 'get',
        params,
    })
}

export async function apiGetRolesList<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/rbac/roles',
        method: 'get',
    })
}

export async function apiGetPermissionsList<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/rbac/permissions',
        method: 'get',
    })
}

export async function apiGetPendingUsersList<
    T,
    U extends Record<string, unknown>,
>(params: U) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/rbac/pending-users',
        method: 'get',
        params,
    })
}
