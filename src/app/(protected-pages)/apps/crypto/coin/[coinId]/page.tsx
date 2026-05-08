import { notFound } from 'next/navigation'
import { getCoinPageData } from '@/server/actions/crypto'
import CoinClient from './_components/CoinClient'
import type { CoinDetails, ChartDataSets, NewsArticle } from './types'

export default async function CoinPage({
    params,
}: {
    params: Promise<{ coinId: string }>
}) {
    const { coinId } = await params
    const { details, chartData, news } = await getCoinPageData(coinId)

    if (!details || !chartData) notFound()

    return (
        <CoinClient
            coinDetails={details as CoinDetails}
            chartData={chartData as ChartDataSets}
            newsArticles={(news as NewsArticle[]) || []}
        />
    )
}
