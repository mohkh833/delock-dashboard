'use client'

import { useEffect } from 'react'
import { usePayrollStore } from '../_store/payrollStore'
import type { GetPayrollResponse } from '../types'

type PayrollProviderProps = {
    data: GetPayrollResponse
    children: React.ReactNode
}

const PayrollProvider = ({ data, children }: PayrollProviderProps) => {
    const setData = usePayrollStore((state) => state.setData)
    const setInitialLoading = usePayrollStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setData(data)
        setInitialLoading(false)
    }, [data, setData, setInitialLoading])

    return <>{children}</>
}

export default PayrollProvider
