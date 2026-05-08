import { getSalesDashboardData } from '@/server/actions/sales'
import AiDashboard from './_components/SalesDashboard'
import { getDateRanges } from './_utils/dateRange'
import dayjs from 'dayjs'
import type { TimeRange, ComparisonPeriod } from './types'

export default async function SalesDashboardPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams
    const timeRange = (searchParams.timeRange as string) || 'thisMonth'
    const comparisonPeriod =
        (searchParams.comparisonPeriod as string) || 'lastMonth'

    const dateRanges = await getDateRanges(
        timeRange as TimeRange,
        comparisonPeriod as ComparisonPeriod,
    )

    const initialData = await getSalesDashboardData({
        timeRange: timeRange as TimeRange,
        comparisonPeriod: comparisonPeriod as ComparisonPeriod,
        startDate: dayjs(dateRanges.current.start).format('YYYY-MM-DD'),
        endDate: dayjs(dateRanges.current.end).format('YYYY-MM-DD'),
        comparisonStartDate: dayjs(dateRanges.comparison.start).format(
            'YYYY-MM-DD',
        ),
        comparisonEndDate: dayjs(dateRanges.comparison.end).format(
            'YYYY-MM-DD',
        ),
    })

    return <AiDashboard data={initialData} />
}
