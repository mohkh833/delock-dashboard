import { create } from 'zustand'
import type { Customer, GetCustomersListResponse } from '../types'

export type Filter = {
    customerLabel: string[]
    status: string
}

export type CustomerListState = {
    data: GetCustomersListResponse
    initialLoading: boolean
    selectedRows: Partial<Customer>[]
    filterData: Filter
}

type CustomerListAction = {
    setData: (payload: GetCustomersListResponse) => void
    setInitialLoading: (payload: boolean) => void
    setSelectedRows: (checked: boolean, customer: Customer) => void
    setSelectAllRows: (customer: Customer[]) => void
    setFilterData: (payload: Partial<Filter>) => void
}

const initialState: CustomerListState = {
    data: {
        list: [],
        total: 0,
    },
    initialLoading: true,
    selectedRows: [],
    filterData: {
        customerLabel: [],
        status: '',
    },
}

export const useCustomerListStore = create<
    CustomerListState & CustomerListAction
>((set) => ({
    ...initialState,
    setData: (payload) => set(() => ({ data: payload })),
    setInitialLoading: (payload) => set(() => ({ initialLoading: payload })),
    setSelectedRows: (checked, row) =>
        set((state) => {
            const prevData = state.selectedRows
            if (checked) {
                return { selectedRows: [...prevData, ...[row]] }
            } else {
                if (
                    prevData.some((prevCustomer) => row.id === prevCustomer.id)
                ) {
                    return {
                        selectedRows: prevData.filter(
                            (prevCustomer) => prevCustomer.id !== row.id,
                        ),
                    }
                }
                return { selectedRows: prevData }
            }
        }),
    setSelectAllRows: (row) => set(() => ({ selectedRows: row })),
    setFilterData: (payload) =>
        set((state) => ({
            filterData: {
                ...state.filterData,
                ...payload,
            },
        })),
}))
