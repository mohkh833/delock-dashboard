'use client'

import { useState, useEffect, startTransition } from 'react'
import Skeleton from '@/components/ui/Skeleton'
import Card from '@/components/ui/Card'
import PipelineFunnel from './PipelineFunnel'
import RevenuePerformance from './RevenuePerformance'
import ActionList from './ActionList'
import LeadVelocity from './LeadVelocity'
import GeographicDistribution from './GeographicDistribution'
import AtRiskDeals from './AtRiskDeals'
import WinRateGauge from './WinRateGauge'
import type { CrmDashboardData, DashboardFilters, Action } from '../types'

type Props = {
    data: CrmDashboardData
    filters: DashboardFilters
}

const CrmDashboardContent = ({ data, filters }: Props) => {
    const [actions, setActions] = useState<Action[]>(data.actions)

    useEffect(() => {
        startTransition(() => {
            setActions(data.actions)
        })
    }, [data.actions])

    const handleToggleComplete = (actionId: string) => {
        setActions((prev) =>
            prev.map((action) =>
                action.id === actionId
                    ? { ...action, completed: !action.completed }
                    : action,
            ),
        )
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Left column — 2/3 width */}
            <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-4">
                <PipelineFunnel
                    data={data.pipeline}
                    pipelineStages={filters.pipelineStages}
                    applyProbabilityWeighting={
                        filters.viewPreferences.applyProbabilityWeighting
                    }
                    highlightStalledDeals={
                        filters.viewPreferences.highlightStalledDeals
                    }
                    currency={filters.viewPreferences.currency}
                />
                <RevenuePerformance
                    data={data.revenue}
                    currency={filters.viewPreferences.currency}
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <ActionList
                        data={actions}
                        timeHorizon={filters.timeHorizon}
                        onToggleComplete={handleToggleComplete}
                    />
                    <LeadVelocity
                        data={data.leadVelocity}
                        timeHorizon={filters.timeHorizon}
                    />
                </div>
            </div>
            {/* Right column — 1/3 width */}
            <div className="col-span-1 md:col-span-1 lg:col-span-1 space-y-4">
                <GeographicDistribution
                    data={data.geographic}
                    currency={filters.viewPreferences.currency}
                    highlightStalledDeals={
                        filters.viewPreferences.highlightStalledDeals
                    }
                />
                <AtRiskDeals
                    data={data.atRisk}
                    teamSelection={filters.teamSelection}
                />
                <WinRateGauge data={data.winRate} />
            </div>
        </div>
    )
}

export default CrmDashboardContent

export const CrmDashboardContentSkeleton = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="col-span-1 md:col-span-2 lg:col-span-2 space-y-4">
            <Card bodyClass="space-y-4">
                <Skeleton height={12} width={160} />
                <Skeleton height={320} width="100%" />
            </Card>
            <Card bodyClass="space-y-4">
                <Skeleton height={12} width={160} />
                <Skeleton height={370} width="100%" />
            </Card>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card bodyClass="space-y-4">
                    <Skeleton height={12} width={160} />
                    <div className="h-[350px] divide-y divide-gray-200 dark:divide-gray-700">
                        {Array.from({ length: 8 }).map((_, i) => (
                            <div
                                key={i}
                                className="flex items-center justify-between py-2"
                            >
                                <div className="flex gap-2">
                                    <Skeleton
                                        variant="circle"
                                        height={16}
                                        width={16}
                                    />
                                    <div className="space-y-2">
                                        <Skeleton height={12} width={120} />
                                        <Skeleton height={12} width={180} />
                                    </div>
                                </div>
                                <Skeleton height={12} width={50} />
                            </div>
                        ))}
                    </div>
                </Card>
                <Card bodyClass="space-y-4">
                    <div className="flex items-center justify-between">
                        <Skeleton height={12} width={160} />
                        <Skeleton height={12} width={60} />
                    </div>
                    <Skeleton height={20} width={100} />
                    {Array.from({ length: 3 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-2"
                        >
                            <Skeleton height={12} width={120} />
                            <Skeleton height={12} width={50} />
                        </div>
                    ))}
                    <Skeleton height={250} width="100%" />
                </Card>
            </div>
        </div>
        <div className="col-span-1 md:col-span-1 lg:col-span-1 space-y-4">
            <Card bodyClass="space-y-4">
                <Skeleton height={12} width={160} />
                <Skeleton height={230} width="100%" />
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {Array.from({ length: 7 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-3"
                        >
                            <Skeleton height={12} width={120} />
                            <Skeleton height={12} width={50} />
                        </div>
                    ))}
                </div>
            </Card>
            <Card bodyClass="space-y-4">
                <Skeleton height={12} width={160} />
                <Skeleton height={20} width={100} />
                <div className="flex gap-0.5">
                    {Array.from({ length: 45 }).map((_, i) => (
                        <Skeleton key={i} className="flex-1" height={32} />
                    ))}
                </div>
                {Array.from({ length: 3 }).map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center justify-between py-2"
                    >
                        <div className="flex gap-2">
                            <Skeleton variant="circle" height={16} width={16} />
                            <Skeleton height={12} width={120} />
                        </div>
                        <Skeleton height={12} width={50} />
                    </div>
                ))}
            </Card>
            <Card bodyClass="space-y-4">
                <Skeleton height={12} width={160} />
                <div className="flex justify-center my-12">
                    <Skeleton variant="circle" height={190} width={190} />
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                    {Array.from({ length: 4 }).map((_, i) => (
                        <div
                            key={i}
                            className="flex items-center justify-between py-2"
                        >
                            <Skeleton height={12} width={120} />
                            <Skeleton height={12} width={50} />
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    </div>
)
