'use client'

import { useEffect } from 'react'
import { useLeadsListStore } from '../_store/leadsListStore'
import type { CommonProps } from '@/@types/common'
import type { GetLeadsListResponse } from '../types'

interface LeadsProviderProps extends CommonProps {
    data: GetLeadsListResponse
}

const LeadsProvider = ({ data, children }: LeadsProviderProps) => {
    const setData = useLeadsListStore((state) => state.setData)
    const setInitialLoading = useLeadsListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setData(data)
        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return <>{children}</>
}

export default LeadsProvider
