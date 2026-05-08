'use client'

import { useEffect } from 'react'
import { useCustomerListStore } from '../_store/customerListStore'
import type { CommonProps } from '@/@types/common'
import type { GetCustomersListResponse } from '../types'

interface CustomerListProviderProps extends CommonProps {
    data: GetCustomersListResponse
}

const CustomerListProvider = ({
    data,
    children,
}: CustomerListProviderProps) => {
    const setData = useCustomerListStore((state) => state.setData)
    const setInitialLoading = useCustomerListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setData(data)
        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return <>{children}</>
}

export default CustomerListProvider
