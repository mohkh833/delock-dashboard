import {
    getUsersList,
    getRolesList,
    getPermissionsList,
    getPendingUsersList,
} from '@/server/actions/accounts'
import AccessControlClient from './_components/AccessControlClient'
import type { GetPendingUsersResponse } from './types'

export default async function UsersPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams

    const pageIndex = Number(searchParams.pageIndex) || 1
    const pageSize = Number(searchParams.pageSize) || 25
    const query = (searchParams.query as string) || ''
    const status = (searchParams.status as string) || ''
    const role = (searchParams.role as string) || ''
    const requestedRole = (searchParams.requestedRole as string) || ''

    const [users, roles, permissions, pendingUsers] = await Promise.all([
        getUsersList({ pageIndex, pageSize, query, status, role }),
        getRolesList(),
        getPermissionsList(),
        getPendingUsersList({ pageIndex, pageSize, query, requestedRole }),
    ])

    return (
        <AccessControlClient
            initialData={{
                users,
                roles,
                permissions,
                pendingUsers: pendingUsers as GetPendingUsersResponse,
            }}
        />
    )
}
