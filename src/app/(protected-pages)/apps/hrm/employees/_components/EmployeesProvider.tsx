'use client'

import { useEffect } from 'react'
import { useEmployeesStore } from '../_store/employeesStore'
import type { GetEmployeesResponse } from '../types'
import type { ReactNode } from 'react'

type EmployeesProviderProps = {
    data: GetEmployeesResponse
    children: ReactNode
}

const EmployeesProvider = ({ data, children }: EmployeesProviderProps) => {
    const setData = useEmployeesStore((state) => state.setData)
    const setInitialLoading = useEmployeesStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setData(data)
        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return <>{children}</>
}

export default EmployeesProvider
