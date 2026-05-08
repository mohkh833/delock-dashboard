'use client'
import { useMemo } from 'react'
import Card from '@/components/ui/Card'
import Switcher from '@/components/ui/Switcher'
import LineChart from '@/components/shared/Chart/LineChart'
import RevenueMetrics from './RevenueMetrics'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import dayjs from 'dayjs'
import type { RevenueTrendsData, MetricType } from './types'

const metricOptions: Array<{
    value: MetricType
    label: string
    color: string
}> = [
    { value: 'mrr', label: 'MRR', color: 'var(--primary)' },
    { value: 'arr', label: 'ARR', color: 'var(--success)' },
    {
        value: 'activeSubscriptions',
        label: 'Active Subscriptions',
        color: 'var(--info)',
    },
    { value: 'netRevenue', label: 'Net Revenue', color: 'var(--warning)' },
]

type RevenueTrendsChartProps = {
    trendsData: RevenueTrendsData
    selectedMetric: MetricType
    comparison: string
}

const RevenueTrendsChart = ({
    trendsData,
    selectedMetric,
    comparison,
}: RevenueTrendsChartProps) => {
    const appendQueryParams = useAppendQueryParams()
    const includeComparison = comparison !== 'none'

    const chartData = useMemo(() => {
        const metricData = trendsData?.metrics?.[selectedMetric]
        if (!metricData || !Array.isArray(metricData)) return []

        return metricData.map((item) => ({
            date: dayjs(item.date).format('MMM DD'),
            [selectedMetric]: item.value,
            ...(includeComparison &&
                item.previousValue && {
                    [`${selectedMetric}Previous`]: item.previousValue,
                }),
        }))
    }, [trendsData, selectedMetric, includeComparison])

    const lineConfig = useMemo(() => {
        const selectedOption = metricOptions.find(
            (option) => option.value === selectedMetric,
        )
        const config: Array<{
            type?: 'linear' | 'monotone'
            dataKey: string
            stroke: string
            strokeWidth: number
            dot: boolean
            strokeDasharray?: string
        }> = [
            {
                type: 'linear',
                dataKey: selectedMetric,
                stroke: selectedOption?.color || 'var(--primary)',
                strokeWidth: 3,
                dot: false,
            },
        ]

        if (includeComparison) {
            config.push({
                type: 'linear',
                dataKey: `${selectedMetric}Previous`,
                stroke: 'var(--gray-400)',
                strokeWidth: 2,
                strokeDasharray: '5 5',
                dot: false,
            })
        }
        return config
    }, [selectedMetric, includeComparison])

    const getComparisonLabel = () => {
        switch (comparison) {
            case 'previousPeriod':
                return 'Previous Period'
            case 'sameLastYear':
                return 'Same Period Last Year'
            default:
                return 'Previous Period'
        }
    }

    return (
        <Card bodyClass="p-0">
            <RevenueMetrics
                trendsData={trendsData}
                selectedMetric={selectedMetric}
                onMetricChange={(metric) => appendQueryParams({ metric })}
            />
            <div className="flex flex-col gap-6 p-6">
                <div className="relative">
                    <LineChart
                        data={chartData}
                        lineConfig={lineConfig}
                        height={400}
                        xAxisConfig={{ dataKey: 'date' }}
                    />
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        {includeComparison && (
                            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-0.5 rounded"
                                        style={{
                                            backgroundColor: metricOptions.find(
                                                (o) =>
                                                    o.value === selectedMetric,
                                            )?.color,
                                        }}
                                    />
                                    <span>Current Period</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div
                                        className="w-3 h-0.5 rounded"
                                        style={{
                                            borderTop:
                                                '2px dashed var(--gray-400)',
                                            backgroundColor: 'transparent',
                                        }}
                                    />
                                    <span>{getComparisonLabel()}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="flex items-center gap-2">
                        <span className="font-medium">
                            Compare to last year
                        </span>
                        <Switcher
                            checked={comparison === 'sameLastYear'}
                            onChange={(checked) =>
                                appendQueryParams({
                                    comparison: checked
                                        ? 'sameLastYear'
                                        : 'none',
                                })
                            }
                        />
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default RevenueTrendsChart
