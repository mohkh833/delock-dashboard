import { create } from 'zustand'
import type {
    Role,
    PermissionGroup,
    GetUserListResponse,
    GetPendingUsersResponse,
} from '../types'

type AccessControlState = {
    currentTab: string

    // Data
    userList: GetUserListResponse['list']
    userListTotal: number
    pendingUserList: GetPendingUsersResponse['list']
    pendingUserListTotal: number
    roleList: Role[]
    permissionList: PermissionGroup[]

    // Loading / interaction
    initialLoading: boolean
    everInteracted: boolean

    // Role / permission UI state
    selectedRole: Role | null
    permissionDialogOpen: boolean
    isRoleModalOpen: boolean
    isDeleteModalOpen: boolean
    roleModalMode: 'create' | 'edit'
    permissionSearch: string
    loading: boolean
    error: string | null
}

type AccessControlActions = {
    setCurrentTab: (tab: string) => void

    setUserList: (list: GetUserListResponse['list']) => void
    setUserListTotal: (total: number) => void
    setPendingUserList: (list: GetPendingUsersResponse['list']) => void
    setPendingUserListTotal: (total: number) => void
    setRoleList: (roles: Role[]) => void
    setPermissionList: (permissions: PermissionGroup[]) => void

    setInitialLoading: (loading: boolean) => void
    setEverInteracted: (value: boolean) => void

    setSelectedRole: (role: Role | null) => void
    openRoleModal: (mode: 'create' | 'edit', role?: Role) => void
    closeRoleModal: () => void
    openDeleteModal: (role: Role) => void
    closeDeleteModal: () => void
    setPermissionDialogOpen: (isOpen: boolean) => void
    setPermissionSearch: (search: string) => void
    setLoading: (loading: boolean) => void
    setError: (error: string | null) => void
    clearError: () => void

    // Updater functions (mirror Vite DataContext API)
    setUsersData: (
        updater: (data: GetUserListResponse) => GetUserListResponse,
    ) => void
    setRolesData: (updater: (data: Role[]) => Role[]) => void
    setPendingUsersData: (
        updater: (data: GetPendingUsersResponse) => GetPendingUsersResponse,
    ) => void
}

const initialState: AccessControlState = {
    currentTab: 'user',

    userList: [],
    userListTotal: 0,
    pendingUserList: [],
    pendingUserListTotal: 0,
    roleList: [],
    permissionList: [],

    initialLoading: true,
    everInteracted: false,

    selectedRole: null,
    permissionDialogOpen: false,
    isRoleModalOpen: false,
    isDeleteModalOpen: false,
    roleModalMode: 'create',
    permissionSearch: '',
    loading: false,
    error: null,
}

export const useAccessControlStore = create<
    AccessControlState & AccessControlActions
>((set, get) => ({
    ...initialState,

    setCurrentTab: (tab) => set({ currentTab: tab }),

    setUserList: (list) => set({ userList: list }),
    setUserListTotal: (total) => set({ userListTotal: total }),
    setPendingUserList: (list) => set({ pendingUserList: list }),
    setPendingUserListTotal: (total) => set({ pendingUserListTotal: total }),
    setRoleList: (roles) => set({ roleList: roles }),
    setPermissionList: (permissions) => set({ permissionList: permissions }),

    setInitialLoading: (loading) => set({ initialLoading: loading }),
    setEverInteracted: (value) => set({ everInteracted: value }),

    setSelectedRole: (role) => set({ selectedRole: role }),
    openRoleModal: (mode, role) =>
        set({
            isRoleModalOpen: true,
            roleModalMode: mode,
            selectedRole: role || null,
        }),
    closeRoleModal: () =>
        set({
            isRoleModalOpen: false,
            roleModalMode: 'create',
        }),
    openDeleteModal: (role) =>
        set({
            isDeleteModalOpen: true,
            selectedRole: role,
        }),
    closeDeleteModal: () => set({ isDeleteModalOpen: false }),
    setPermissionDialogOpen: (isOpen) => set({ permissionDialogOpen: isOpen }),
    setPermissionSearch: (search) => set({ permissionSearch: search }),
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
    clearError: () => set({ error: null }),

    setUsersData: (updater) => {
        const { userList, userListTotal } = get()
        const current: GetUserListResponse = {
            list: userList,
            total: userListTotal,
        }
        const updated = updater(current)
        set({ userList: updated.list, userListTotal: updated.total })
    },

    setRolesData: (updater) => {
        const { roleList } = get()
        const updated = updater(roleList)
        set({ roleList: updated })
    },

    setPendingUsersData: (updater) => {
        const { pendingUserList, pendingUserListTotal } = get()
        const current: GetPendingUsersResponse = {
            list: pendingUserList,
            total: pendingUserListTotal,
        }
        const updated = updater(current)
        set({
            pendingUserList: updated.list,
            pendingUserListTotal: updated.total,
        })
    },
}))
