import { create } from 'zustand'
import type { GetPayrollResponse, PayrollRecord } from '../types'

const defaultData: GetPayrollResponse = {
    records: [],
    metrics: {
        totalPaid: 0,
        breakdown: {
            baseSalary: 0,
            bonuses: 0,
            overtime: 0,
            allowances: 0,
            deductions: 0,
        },
        summary: {
            deductions: 0,
            extras: 0,
            retentions: 0,
            additions: 0,
        },
    },
    total: 0,
}

type PayrollStore = {
    data: GetPayrollResponse
    initialLoading: boolean
    setData: (data: GetPayrollResponse) => void
    setInitialLoading: (loading: boolean) => void
    updatePayrollRecord: (id: string, updates: Partial<PayrollRecord>) => void
}

export const usePayrollStore = create<PayrollStore>((set) => ({
    data: defaultData,
    initialLoading: true,
    setData: (data) => set({ data }),
    setInitialLoading: (loading) => set({ initialLoading: loading }),
    updatePayrollRecord: (id, updates) =>
        set((state) => ({
            data: {
                ...state.data,
                records: state.data.records.map((r) =>
                    r.id === id ? { ...r, ...updates } : r,
                ),
            },
        })),
}))
