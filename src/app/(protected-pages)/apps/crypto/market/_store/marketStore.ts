import { create } from 'zustand'
import type { GetMarketDataResponse, MarketStatistics } from '../types'

type MarketStore = {
    marketResponse: GetMarketDataResponse | null
    statistics: MarketStatistics | null
    initialLoading: boolean
    setMarketResponse: (data: GetMarketDataResponse) => void
    setStatistics: (stats: MarketStatistics) => void
    setInitialLoading: (v: boolean) => void
}

export const useMarketStore = create<MarketStore>((set) => ({
    marketResponse: null,
    statistics: null,
    initialLoading: true,
    setMarketResponse: (marketResponse) => set({ marketResponse }),
    setStatistics: (statistics) => set({ statistics }),
    setInitialLoading: (initialLoading) => set({ initialLoading }),
}))
