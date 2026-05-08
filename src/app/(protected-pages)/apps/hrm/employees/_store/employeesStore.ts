import { create } from 'zustand'
import type { Employee, GetEmployeesResponse } from '../types'

type EmployeesState = {
    data: GetEmployeesResponse
    initialLoading: boolean
    viewMode: 'grid' | 'list'
    selectedEmployees: string[]
    showAddEmployee: boolean
    showBatchUpload: boolean
    showBulkEdit: boolean
    showBulkDelete: boolean
    editEmployee: Employee | null
    deleteEmployee: Employee | null
    viewEmployeeId: string | null
}

type EmployeesActions = {
    setData: (data: GetEmployeesResponse) => void
    setInitialLoading: (loading: boolean) => void
    setViewMode: (mode: 'grid' | 'list') => void
    setSelectedEmployees: (ids: string[]) => void
    toggleEmployeeSelection: (id: string) => void
    clearSelection: () => void
    openAddEmployee: () => void
    openEditEmployee: (employee: Employee) => void
    closeAddEmployee: () => void
    openBatchUpload: () => void
    closeBatchUpload: () => void
    openBulkEdit: () => void
    closeBulkEdit: () => void
    openBulkDelete: () => void
    closeBulkDelete: () => void
    openDeleteEmployee: (employee: Employee) => void
    closeDeleteEmployee: () => void
    setViewEmployeeId: (id: string | null) => void
    createEmployee: (employee: Employee) => void
    updateEmployee: (id: string, updates: Partial<Employee>) => void
    deleteEmployeeById: (id: string) => void
    bulkUpdateEmployees: (
        ids: string[],
        status: Employee['accountInfo']['status'],
    ) => void
    bulkDeleteEmployees: (ids: string[]) => void
}

const initialState: EmployeesState = {
    data: { employees: [], total: 0 },
    initialLoading: true,
    viewMode: 'grid',
    selectedEmployees: [],
    showAddEmployee: false,
    showBatchUpload: false,
    showBulkEdit: false,
    showBulkDelete: false,
    editEmployee: null,
    deleteEmployee: null,
    viewEmployeeId: null,
}

export const useEmployeesStore = create<EmployeesState & EmployeesActions>()(
    (set, get) => ({
        ...initialState,
        setData: (data) => set({ data }),
        setInitialLoading: (initialLoading) => set({ initialLoading }),
        setViewMode: (viewMode) => set({ viewMode }),
        setSelectedEmployees: (selectedEmployees) => set({ selectedEmployees }),
        toggleEmployeeSelection: (id) => {
            const current = get().selectedEmployees
            const isSelected = current.includes(id)
            set({
                selectedEmployees: isSelected
                    ? current.filter((empId) => empId !== id)
                    : [...current, id],
            })
        },
        clearSelection: () => set({ selectedEmployees: [] }),
        openAddEmployee: () =>
            set({ showAddEmployee: true, editEmployee: null }),
        openEditEmployee: (employee) =>
            set({ showAddEmployee: true, editEmployee: employee }),
        closeAddEmployee: () =>
            set({ showAddEmployee: false, editEmployee: null }),
        openBatchUpload: () => set({ showBatchUpload: true }),
        closeBatchUpload: () => set({ showBatchUpload: false }),
        openBulkEdit: () => set({ showBulkEdit: true }),
        closeBulkEdit: () => set({ showBulkEdit: false }),
        openBulkDelete: () => set({ showBulkDelete: true }),
        closeBulkDelete: () => set({ showBulkDelete: false }),
        openDeleteEmployee: (employee) => set({ deleteEmployee: employee }),
        closeDeleteEmployee: () => set({ deleteEmployee: null }),
        setViewEmployeeId: (viewEmployeeId) => set({ viewEmployeeId }),
        createEmployee: (employee) => {
            const { data } = get()
            set({
                data: {
                    employees: [employee, ...data.employees],
                    total: data.total + 1,
                },
            })
        },
        updateEmployee: (id, updates) => {
            const { data } = get()
            set({
                data: {
                    ...data,
                    employees: data.employees.map((emp) =>
                        emp.id === id ? { ...emp, ...updates } : emp,
                    ),
                },
            })
        },
        deleteEmployeeById: (id) => {
            const { data } = get()
            set({
                data: {
                    employees: data.employees.filter((emp) => emp.id !== id),
                    total: data.total - 1,
                },
            })
        },
        bulkUpdateEmployees: (ids, status) => {
            const { data } = get()
            set({
                data: {
                    ...data,
                    employees: data.employees.map((emp) =>
                        ids.includes(emp.id)
                            ? {
                                  ...emp,
                                  accountInfo: { ...emp.accountInfo, status },
                              }
                            : emp,
                    ),
                },
            })
        },
        bulkDeleteEmployees: (ids) => {
            const { data } = get()
            set({
                data: {
                    employees: data.employees.filter(
                        (emp) => !ids.includes(emp.id),
                    ),
                    total: data.total - ids.length,
                },
            })
        },
    }),
)
