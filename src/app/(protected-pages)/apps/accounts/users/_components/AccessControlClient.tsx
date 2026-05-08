'use client'

import { useEffect, startTransition } from 'react'
import { useSearchParams } from 'next/navigation'
import useSWR from 'swr'
import { useAccessControlStore } from '../store/accessControlStore'
import {
    apiGetUsersList,
    apiGetPendingUsersList,
} from '@/services/client/AccountService'
import AccessControlHeader from './AccessControlHeader'
import AccessControlTabs from './AccessControlTabs'
import AccessControlContent from './AccessControlContent'
import type {
    GetUserListResponse,
    GetPendingUsersResponse,
    Role,
    PermissionGroup,
} from '../types'

type AccessControlClientProps = {
    initialData: {
        users: GetUserListResponse
        roles: Role[]
        permissions: PermissionGroup[]
        pendingUsers: GetPendingUsersResponse
    }
}

const AccessControlClient = ({ initialData }: AccessControlClientProps) => {
    const searchParams = useSearchParams()

    const setUserList = useAccessControlStore((s) => s.setUserList)
    const setUserListTotal = useAccessControlStore((s) => s.setUserListTotal)
    const setPendingUserList = useAccessControlStore(
        (s) => s.setPendingUserList,
    )
    const setPendingUserListTotal = useAccessControlStore(
        (s) => s.setPendingUserListTotal,
    )
    const setRoleList = useAccessControlStore((s) => s.setRoleList)
    const setPermissionList = useAccessControlStore((s) => s.setPermissionList)
    const setInitialLoading = useAccessControlStore((s) => s.setInitialLoading)
    const everInteracted = useAccessControlStore((s) => s.everInteracted)

    // Hydrate store with initial SSR data
    useEffect(() => {
        startTransition(() => {
            setUserList(initialData.users.list)
            setUserListTotal(initialData.users.total)
            setPendingUserList(initialData.pendingUsers.list)
            setPendingUserListTotal(initialData.pendingUsers.total)
            setRoleList(initialData.roles)
            setPermissionList(initialData.permissions)
            setInitialLoading(false)
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [initialData])

    const pageIndex = searchParams.get('pageIndex') || '1'
    const pageSize = searchParams.get('pageSize') || '25'
    const query = searchParams.get('query') || ''
    const status = searchParams.get('status') || ''
    const role = searchParams.get('role') || ''
    const requestedRole = searchParams.get('requestedRole') || ''

    // SWR for users list — gated by everInteracted
    const { isLoading: isUsersLoading } = useSWR(
        everInteracted
            ? ['/api/rbac/users', { pageIndex, pageSize, query, status, role }]
            : null,
        ([, params]) =>
            apiGetUsersList<GetUserListResponse, Record<string, string>>(
                params as Record<string, string>,
            ),
        {
            revalidateOnFocus: false,
            onSuccess: (data) => {
                if (data) {
                    startTransition(() => {
                        setUserList(data.list)
                        setUserListTotal(data.total)
                    })
                }
            },
        },
    )

    // SWR for pending users — gated by everInteracted
    const { isLoading: isPendingUsersLoading } = useSWR(
        everInteracted
            ? [
                  '/api/rbac/pending-users',
                  { pageIndex, pageSize, query, requestedRole },
              ]
            : null,
        ([, params]) =>
            apiGetPendingUsersList<
                GetPendingUsersResponse,
                Record<string, string>
            >(params as Record<string, string>),
        {
            revalidateOnFocus: false,
            onSuccess: (data) => {
                if (data) {
                    startTransition(() => {
                        setPendingUserList(data.list)
                        setPendingUserListTotal(data.total)
                    })
                }
            },
        },
    )

    // Expose loading states to store so child components can read them
    const setLoadingInStore = useAccessControlStore((s) => s.setLoading)
    useEffect(() => {
        setLoadingInStore(isUsersLoading || isPendingUsersLoading)
    }, [isUsersLoading, isPendingUsersLoading, setLoadingInStore])

    return (
        <div className="flex flex-col h-full">
            <AccessControlHeader />
            <AccessControlTabs />
            <AccessControlContent />
        </div>
    )
}

export default AccessControlClient
