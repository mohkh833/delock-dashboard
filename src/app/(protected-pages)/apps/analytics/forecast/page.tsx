import { getForecastData } from '@/server/actions/analytics'
import Container from '@/components/shared/Container'
import ForecastHeader from './_components/ForecastHeader'
import RevenueForecastCard from './_components/RevenueForecastCard'
import UserGrowthForecastCard from './_components/UserGrowthForecastCard'
import SubscriptionForecastCard from './_components/SubscriptionForecastCard'
import ChurnRetentionForecastCard from './_components/ChurnRetentionForecastCard'
import type { ChurnRetentionForecastData } from './types'

export default async function ForecastPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string>>
}) {
    const params = await searchParams
    const scenario = params.scenario || 'expected'
    const dateRange = params.dateRange || 'next-6-month'

    const data = await getForecastData({ scenario, dateRange })

    return (
        <Container>
            <div className="space-y-8 pb-8">
                <ForecastHeader scenario={scenario} dateRange={dateRange} />
                <div className="space-y-4">
                    <RevenueForecastCard data={data.revenue} />
                    <UserGrowthForecastCard data={data.userGrowth} />
                    <SubscriptionForecastCard data={data.subscription} />
                    <ChurnRetentionForecastCard
                        data={data.churnRetention as ChurnRetentionForecastData}
                    />
                </div>
            </div>
        </Container>
    )
}
