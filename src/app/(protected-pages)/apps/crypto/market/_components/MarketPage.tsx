'use client'

import Container from '@/components/shared/Container'
import MarketProvider from './MarketProvider'
import MarketHeader from './MarketHeader'
import MarketStatistic from './MarketStatistic'
import MarketTab from './MarketTab'
import MarketActionTools from './MarketActionTools'
import MarketContent from './MarketContent'
import type { GetMarketDataResponse, MarketStatistics } from '../types'

type MarketPageProps = {
    data: GetMarketDataResponse
    statistics: MarketStatistics
}

const MarketPage = ({ data, statistics }: MarketPageProps) => {
    return (
        <MarketProvider data={data} statistics={statistics}>
            <Container>
                <div className="flex flex-col gap-4">
                    <MarketHeader />
                    <MarketStatistic />
                    <MarketTab />
                    <MarketActionTools />
                    <MarketContent />
                </div>
            </Container>
        </MarketProvider>
    )
}

export default MarketPage
