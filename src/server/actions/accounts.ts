'use server'

import {
    profileSettingsData,
    notificationSettings2Data,
    securitySettingsData,
    billingSettingsData,
    intergrationSettingData,
    referralData,
    pricingPlansData,
} from '@/mock/data/accountsData'
import { logData } from '@/mock/data/logData'

export async function getSettingsProfile() {
    return profileSettingsData
}

export async function getSettingsSecurity() {
    return securitySettingsData
}

export async function getSettingsNotification() {
    return notificationSettings2Data
}

export async function getSettingsBilling() {
    return billingSettingsData
}

export async function getSettingsIntegrations() {
    return intergrationSettingData
}

export async function getReferralData() {
    return referralData
}

export async function getPricingPlans() {
    return pricingPlansData
}

export async function getActivityLogs(activityIndex: number = 1) {
    const maxGetItem = 3
    const count = (activityIndex - 1) * maxGetItem
    const loadable = count < logData.length
    const list = logData.slice(count, activityIndex * maxGetItem)
    return { index: activityIndex, list, loadable }
}

// ---- Access Control / RBAC ----

import {
    rolesData,
    permissionsData,
    pendingUsersData,
} from '@/mock/data/accountsData'
import { userDetailData } from '@/mock/data/usersData'

type GetUsersListParams = {
    pageIndex?: number
    pageSize?: number
    query?: string
    status?: string
    role?: string
}

export async function getUsersList(params: GetUsersListParams = {}) {
    const {
        pageIndex = 1,
        pageSize = 25,
        query = '',
        status = '',
        role = '',
    } = params

    let filtered = [...userDetailData]

    if (query) {
        const q = query.toLowerCase()
        filtered = filtered.filter(
            (u) =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q),
        )
    }

    if (status) {
        filtered = filtered.filter((u) => u.status === status)
    }

    if (role) {
        const roles = role.split(',').filter(Boolean)
        filtered = filtered.filter((u) => roles.some((r) => u.role.includes(r)))
    }

    const total = filtered.length
    const start = (pageIndex - 1) * pageSize
    const list = filtered.slice(start, start + pageSize).map((u) => ({
        id: u.id,
        name: u.name,
        firstName: u.firstName,
        lastName: u.lastName,
        email: u.email,
        img: u.img,
        role: u.role,
        lastOnline: u.lastOnline,
        status: u.status,
    }))

    return { list, total }
}

export async function getRolesList() {
    return rolesData
}

export async function getPermissionsList() {
    return permissionsData
}

type GetPendingUsersListParams = {
    pageIndex?: number
    pageSize?: number
    query?: string
    requestedRole?: string
}

export async function getPendingUsersList(
    params: GetPendingUsersListParams = {},
) {
    const {
        pageIndex = 1,
        pageSize = 25,
        query = '',
        requestedRole = '',
    } = params

    let filtered = [...pendingUsersData]

    if (query) {
        const q = query.toLowerCase()
        filtered = filtered.filter(
            (u) =>
                u.name.toLowerCase().includes(q) ||
                u.email.toLowerCase().includes(q),
        )
    }

    if (requestedRole) {
        const roles = requestedRole.split(',').filter(Boolean)
        filtered = filtered.filter((u) =>
            roles.some((r) => u.requestedRole.includes(r)),
        )
    }

    const total = filtered.length
    const start = (pageIndex - 1) * pageSize
    const list = filtered.slice(start, start + pageSize)

    return { list, total }
}
