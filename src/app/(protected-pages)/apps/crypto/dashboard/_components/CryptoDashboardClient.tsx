'use client'

import { useState, useCallback } from 'react'
import CryptoDashboardContainer from './CryptoDashboardContainer'
import TotalPortfolio from './TotalPortfolio'
import MyAssets from './MyAssets'
import WatchlistTable from './Watchlist'
import BuySellPanel from './BuySellPanel'
import TransactionHistory from './TransactionHistory'
import { useCryptoDashboardStore } from '../_store/cryptoDashboardStore'
import type {
    CryptoDashboardData,
    DashboardWatchlistItem,
    TimeRange,
} from '../types'

type CryptoDashboardClientProps = {
    initialData: CryptoDashboardData
}

const CryptoDashboardClient = ({ initialData }: CryptoDashboardClientProps) => {
    const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('1m')
    const { balance, chartData, assets, watchlist, transactions } = initialData

    const setSelectedAsset = useCryptoDashboardStore(
        (state) => state.setSelectedAsset,
    )

    const handleBuyClick = useCallback(
        (item: DashboardWatchlistItem) => {
            setSelectedAsset({
                name: item.name,
                symbol: item.symbol,
                icon: item.icon,
                price: item.price,
            })
        },
        [setSelectedAsset],
    )

    return (
        <CryptoDashboardContainer
            totalPortfolio={
                <TotalPortfolio
                    balance={balance?.total || 0}
                    dailyChange={balance?.dailyChange || 0}
                    dailyChangePercent={balance?.dailyChangePercent || 0}
                    chartData={chartData}
                    selectedTimeRange={selectedTimeRange}
                    onTimeRangeChange={setSelectedTimeRange}
                />
            }
            assetCards={<MyAssets assets={assets} />}
            watchlistTable={
                <WatchlistTable
                    watchlist={watchlist}
                    onBuyClick={handleBuyClick}
                />
            }
            buySellPanel={<BuySellPanel />}
            transactionHistory={
                <TransactionHistory transactions={transactions} />
            }
        />
    )
}

export default CryptoDashboardClient
