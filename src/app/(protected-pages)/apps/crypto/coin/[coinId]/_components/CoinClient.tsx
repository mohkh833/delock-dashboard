'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Container from '@/components/shared/Container'
import CoinHeader from './CoinHeader'
import CoinChart from './CoinChart'
import CoinKeyStats from './CoinKeyStats'
import CoinTabs from './CoinTabs'
import sleep from '@/utils/sleep'
import type {
    CoinDetails,
    ChartTimeRange,
    ChartType,
    ChartDataSets,
    NewsArticle,
} from '../types'

type CoinClientProps = {
    coinDetails: CoinDetails
    chartData: ChartDataSets
    newsArticles: NewsArticle[]
}

const CoinClient = ({
    coinDetails,
    chartData,
    newsArticles,
}: CoinClientProps) => {
    const router = useRouter()

    const [selectedTimeRange, setSelectedTimeRange] =
        useState<ChartTimeRange>('24h')
    const [selectedChartType, setSelectedChartType] =
        useState<ChartType>('line')
    const [activeTab, setActiveTab] = useState<'introduction' | 'feed'>(
        'introduction',
    )
    const [isInWatchlist, setIsInWatchlist] = useState(false)
    const [isWatchlistLoading, setIsWatchlistLoading] = useState(false)

    const handleToggleWatchlist = async () => {
        setIsWatchlistLoading(true)
        await sleep(800)
        setIsInWatchlist((prev) => !prev)
        setIsWatchlistLoading(false)
    }

    const handleDeposit = () => {
        router.push('/apps/crypto/assets')
    }

    const handleTrade = () => {
        router.push(`/apps/crypto/spot?symbol=${coinDetails.symbol}`)
    }

    return (
        <Container>
            <div className="space-y-4">
                <CoinHeader
                    coinDetails={coinDetails}
                    isInWatchlist={isInWatchlist}
                    onToggleWatchlist={handleToggleWatchlist}
                    onDeposit={handleDeposit}
                    onTrade={handleTrade}
                    isWatchlistLoading={isWatchlistLoading}
                />
                <CoinChart
                    data={chartData[selectedTimeRange]}
                    timeRange={selectedTimeRange}
                    chartType={selectedChartType}
                    onTimeRangeChange={setSelectedTimeRange}
                    onChartTypeChange={setSelectedChartType}
                    isLoading={false}
                    coinSymbol={coinDetails.symbol}
                />
                <CoinKeyStats coinDetails={coinDetails} />
                <CoinTabs
                    coinDetails={coinDetails}
                    newsArticles={newsArticles}
                    isLoadingNews={false}
                    activeTab={activeTab}
                    onTabChange={setActiveTab}
                />
            </div>
        </Container>
    )
}

export default CoinClient
