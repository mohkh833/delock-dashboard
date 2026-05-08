'use client'

import { Card } from '@/components/ui'
import SubscriberChart from './SubscriberChart'
import SubscriberMetrics from './SubscriberMetrics'
import type {
    SubscriberTrend,
    SubscriberMetrics as SubscriberMetricsType,
} from './types'

type SubscriberChartViewProps = {
    trends: SubscriberTrend[]
    metrics: SubscriberMetricsType
}

const SubscriberChartView = ({ trends, metrics }: SubscriberChartViewProps) => {
    return (
        <Card bodyClass="p-0">
            <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 p-4">
                    <SubscriberChart trends={trends} />
                </div>
                <div className="lg:w-[350px] flex-shrink-0 border-l border-gray-200 dark:border-gray-700">
                    <SubscriberMetrics metrics={metrics} />
                </div>
            </div>
        </Card>
    )
}

export default SubscriberChartView
