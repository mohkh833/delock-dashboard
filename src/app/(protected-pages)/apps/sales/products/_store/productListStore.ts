import { create } from 'zustand'
import type { Product, GetProductListResponse } from '../types'

type QuickEditDrawerState = {
    open: boolean
    product: Product | null
}

export type ProductListState = {
    data: GetProductListResponse
    initialLoading: boolean
    quickEditDrawer: QuickEditDrawerState
    selectedRows: Partial<Product>[]
}

type ProductListAction = {
    setData: (payload: GetProductListResponse) => void
    setInitialLoading: (payload: boolean) => void
    setQuickEditDrawer: (payload: QuickEditDrawerState) => void
    setSelectedRows: (checked: boolean, customer: Product) => void
    setSelectAllRows: (customer: Product[]) => void
}

const initialState: ProductListState = {
    data: {
        list: [],
        total: 0,
        meta: {
            lowestPrice: 0,
            highestPrice: 100,
            rangeData: [],
        },
    },
    initialLoading: true,
    quickEditDrawer: {
        open: false,
        product: null,
    },
    selectedRows: [],
}

export const useProductListStore = create<ProductListState & ProductListAction>(
    (set) => ({
        ...initialState,
        setData: (payload) => set(() => ({ data: payload })),
        setInitialLoading: (payload) =>
            set(() => ({ initialLoading: payload })),
        setQuickEditDrawer: (payload) =>
            set(() => ({ quickEditDrawer: payload })),
        setSelectedRows: (checked, row) =>
            set((state) => {
                const prevData = state.selectedRows
                if (checked) {
                    return { selectedRows: [...prevData, ...[row]] }
                } else {
                    if (
                        prevData.some(
                            (prevProduct) => row.id === prevProduct.id,
                        )
                    ) {
                        return {
                            selectedRows: prevData.filter(
                                (prevProduct) => prevProduct.id !== row.id,
                            ),
                        }
                    }
                    return { selectedRows: prevData }
                }
            }),
        setSelectAllRows: (row) => set(() => ({ selectedRows: row })),
    }),
)
