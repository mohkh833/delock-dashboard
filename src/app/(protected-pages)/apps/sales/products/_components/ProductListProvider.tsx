'use client'

import { useEffect } from 'react'
import { useProductListStore } from '../_store/productListStore'
import type { CommonProps } from '@/@types/common'
import type { GetProductListResponse } from '../types'

interface ProductListProviderProps extends CommonProps {
    data: GetProductListResponse
}

const ProductListProvider = ({ data, children }: ProductListProviderProps) => {
    const setData = useProductListStore((state) => state.setData)
    const setInitialLoading = useProductListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setData(data)
        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return <>{children}</>
}

export default ProductListProvider
