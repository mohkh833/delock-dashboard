'use client'
import { useState } from 'react'
import AiDashboardContainer from './AiDashboardContainer'
import MetricCard from './MetricCard'
import PresenceMetricCard from './PresenceMetricCard'
import RevenueOrder from './RevenueOrder'
import DepartmentAttendanceChart from './DepartmentAttendanceChart'
import AverageOrderValue from './AverageOrderValue'
import CustomerSegment from './CustomerSegment'
import TrafficAnalysis from './TrafficAnalysis'
import TopPerformingCampaigns from './TopPerformingCampaigns'
import MovementPatternsSection from './MovementPatternsSection'
import AttendanceBarChart from './AttendanceBarChart'
import Dropdown from '@/components/ui/Dropdown'
import Button from '@/components/ui/Button'
import {
    LiUserTick,
    LiLogout,
    LiClock,
    LiBrifecaseTime,
    LiUserMinus,
    LiChevronDown,
} from '@/icons'
import { useSearchParams } from 'next/navigation'
import useTranslation from '@/utils/hooks/useTranslation'
import type { SalesDashboardData, TimeRange } from '../types'

const AiDashboard = ({ data }: { data: SalesDashboardData }) => {
    const t = useTranslation('nav.appsAiDashboard')
    const tp = useTranslation('nav.appsAiDashboard.presenceCard')
    const searchParams = useSearchParams()

    const presenceCategories = [
        { key: 'employees', label: tp('employees') },
        { key: 'visitors', label: tp('visitors') },
        { key: 'dailyWorkers', label: tp('dailyWorkers') },
    ]
    const [presenceCategoryKey, setPresenceCategoryKey] = useState('employees')
    const presenceCategory = presenceCategories.find((c) => c.key === presenceCategoryKey) ?? presenceCategories[0]
    const timeRange =
        (searchParams.get('timeRange') as TimeRange) || 'thisMonth'
    const comparisonEnabled = searchParams.get('comparisonEnabled') !== 'false'

    const {
        metrics,
        revenueTrend,
        supportingMetrics,
        topCampaigns,
    } = data

    return (
        <AiDashboardContainer
            header={
                <div className="flex items-center justify-end gap-2 mb-2">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                        {tp('filterBy')}:
                    </span>
                    <Dropdown
                        activeKey={presenceCategory.key}
                        renderTitle={
                            <Button
                                size="sm"
                                icon={<LiChevronDown className="text-xs" />}
                                iconAlignment="end"
                            >
                                {presenceCategory.label}
                            </Button>
                        }
                        placement="bottom-end"
                    >
                        {presenceCategories.map((cat) => (
                            <Dropdown.Item
                                key={cat.key}
                                eventKey={cat.key}
                                onSelect={() => setPresenceCategoryKey(cat.key)}
                            >
                                {cat.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            }
            metrics={
                <>
                    <PresenceMetricCard selectedCategory={presenceCategory.key} />
                    <MetricCard
                        title={t('attendanceRate')}
                        value={`${metrics?.customerAcquisitionCost.value || 0}%`}
                        change={metrics?.customerAcquisitionCost.change || 0}
                        icon={<LiUserTick />}
                    />
                    <MetricCard
                        title={t('earlyDepartureRate')}
                        value={`${metrics?.averageRevenue.value || 0}%`}
                        change={metrics?.averageRevenue.change || 0}
                        icon={<LiLogout />}
                    />
                    <MetricCard
                        title={t('avgWorkHours')}
                        value={`${metrics?.expenseTotal.value || 0}`}
                        change={metrics?.expenseTotal.change || 0}
                        icon={<LiClock />}
                    />
                    <MetricCard
                        title={t('overtimeHours')}
                        value={0}
                        change={0}
                        icon={<LiBrifecaseTime />}
                    />
                    <MetricCard
                        title={t('absenceRate')}
                        value={`0%`}
                        change={0}
                        icon={<LiUserMinus />}
                    />
                </>
            }
            revenueTrend={<AttendanceBarChart />}
            departmentAttendance={<DepartmentAttendanceChart />}
            // averageOrderValue={
            //     <AverageOrderValue
            //         data={
            //             supportingMetrics?.averageOrderValue || {
            //                 value: 0,
            //                 change: 0,
            //                 chartData: [],
            //             }
            //         }
            //         comparisonEnabled={comparisonEnabled}
            //     />
            // }
            // customerSegment={
            //     <CustomerSegment
            //         data={
            //             supportingMetrics?.customerSegment || {
            //                 chartData: [],
            //                 newCustomers: {
            //                     total: 0,
            //                     percentage: 0,
            //                     change: 0,
            //                 },
            //                 returningCustomers: {
            //                     total: 0,
            //                     percentage: 0,
            //                     change: 0,
            //                 },
            //                 totalCustomers: 0,
            //                 retentionRate: 0,
            //                 revenueSplit: {
            //                     newPercentage: 0,
            //                     returningPercentage: 0,
            //                 },
            //                 repeatPurchaseRatio: 0,
            //             }
            //         }
            //         comparisonEnabled={comparisonEnabled}
            //     />
            // }
            // totalSessions={
            //     <TrafficAnalysis
            //         data={
            //             supportingMetrics?.totalSessions || {
            //                 value: 0,
            //                 change: 0,
            //                 chartData: [],
            //                 sources: [],
            //                 bounceRate: { value: 0, change: 0 },
            //             }
            //         }
            //         comparisonEnabled={comparisonEnabled}
            //     />
            // }
            movementPatterns={<MovementPatternsSection />}
            // topCampaigns={<TopPerformingCampaigns data={topCampaigns || []} />}
        />
    )
}

export default AiDashboard
