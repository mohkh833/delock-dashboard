import Container from '@/components/shared/Container'
import { getRevenueData } from '@/server/actions/analytics'
import RevenueHeader from './_components/RevenueHeader'
import RevenueTrendsChart from './_components/RevenueTrendsChart'
import RevenueBreakdownTable from './_components/RevenueBreakdownTable'
import type {
    DateRangePreset,
    MetricType,
    RevenueTrendsData,
} from './_components/types'

export default async function RevenuePage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string>>
}) {
    const params = await searchParams
    const preset = (params.preset || '30D') as DateRangePreset
    const metric = (params.metric || 'mrr') as MetricType
    const comparison = params.comparison || 'sameLastYear'

    const data = await getRevenueData({ preset, metric, comparison })

    return (
        <Container>
            <div className="space-y-4">
                <RevenueHeader selectedPreset={preset} />
                <RevenueTrendsChart
                    trendsData={data.trends as RevenueTrendsData}
                    selectedMetric={metric}
                    comparison={comparison}
                />
                <RevenueBreakdownTable breakdownData={data.breakdown} />
            </div>
        </Container>
    )
}
