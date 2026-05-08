'use client'

import { useEffect } from 'react'
import { useMarketStore } from '../_store/marketStore'
import type { ReactNode } from 'react'
import type { GetMarketDataResponse, MarketStatistics } from '../types'

type MarketProviderProps = {
    data: GetMarketDataResponse
    statistics: MarketStatistics
    children: ReactNode
}

const MarketProvider = ({
    data,
    statistics,
    children,
}: MarketProviderProps) => {
    const setMarketResponse = useMarketStore((s) => s.setMarketResponse)
    const setStatistics = useMarketStore((s) => s.setStatistics)
    const setInitialLoading = useMarketStore((s) => s.setInitialLoading)

    useEffect(() => {
        setMarketResponse(data)
        setStatistics(statistics)
        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, statistics])

    return <>{children}</>
}

export default MarketProvider
