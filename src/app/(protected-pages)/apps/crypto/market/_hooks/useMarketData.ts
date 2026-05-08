'use client'

import { useCallback } from 'react'
import { useSearchParams } from 'next/navigation'
import { useMarketStore } from '../_store/marketStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import type { MarketType, MarketFilters } from '../types'

function useMarketData() {
    const { marketResponse, statistics, initialLoading } = useMarketStore()
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const activeTab = (searchParams.get('tab') || 'all') as MarketType
    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 20
    const sortKey = searchParams.get('sortKey') || 'marketCap'
    const sortOrder = searchParams.get('sortOrder') || 'desc'
    const search = searchParams.get('search') || ''
    const changeFilter = searchParams.get('changeFilter') || 'all'
    const volumeFilterRaw = searchParams.get('volumeFilter') || ''
    const priceFilterRaw = searchParams.get('priceFilter') || ''

    const volumeFilter = volumeFilterRaw
        ? volumeFilterRaw.split(',').filter(Boolean)
        : []
    const priceFilter = priceFilterRaw
        ? priceFilterRaw.split(',').filter(Boolean)
        : []

    const filters: MarketFilters = {
        tab: activeTab,
        search,
        priceRange: [0, 100000],
        volumeRange: [0, 100000000000],
        changeFilter,
        volumeFilter,
        priceFilter,
    }

    const pagingState = { pageIndex, pageSize, sortKey, sortOrder }

    const setActiveTab = useCallback(
        (tab: MarketType) => {
            appendQueryParams({ tab, pageIndex: 1 })
        },
        [appendQueryParams],
    )

    const setFilters = useCallback(
        (newFilters: Partial<MarketFilters>) => {
            const params: Record<string, string | number | null | undefined> = {
                pageIndex: 1,
            }
            if (newFilters.search !== undefined)
                params.search = newFilters.search
            if (newFilters.changeFilter !== undefined)
                params.changeFilter = newFilters.changeFilter
            if (newFilters.volumeFilter !== undefined)
                params.volumeFilter =
                    newFilters.volumeFilter.length > 0
                        ? newFilters.volumeFilter.join(',')
                        : undefined
            if (newFilters.priceFilter !== undefined)
                params.priceFilter =
                    newFilters.priceFilter.length > 0
                        ? newFilters.priceFilter.join(',')
                        : undefined
            appendQueryParams(params)
        },
        [appendQueryParams],
    )

    const setQueryParams = useCallback(
        (params: Record<string, unknown>) => {
            appendQueryParams(
                params as Record<
                    string,
                    string | number | boolean | null | undefined
                >,
            )
        },
        [appendQueryParams],
    )

    return {
        marketData: marketResponse?.data || null,
        pagination: marketResponse?.pagination || null,
        statistics,
        activeTab,
        filters,
        pagingState,
        filterState: {} as Record<string, string>,
        isLoading: initialLoading,
        error: null,
        setActiveTab,
        setFilters,
        setQueryParams,
        setData: () => {},
        refreshData: () => {},
    }
}

export default useMarketData
