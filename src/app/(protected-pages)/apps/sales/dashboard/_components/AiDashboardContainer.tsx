'use client'
import Container from '@/components/shared/Container'
import type { ReactNode } from 'react'

type AiDashboardContainerProps = {
    header?: ReactNode
    metrics: ReactNode
    movementPatterns?: ReactNode
    revenueTrend?: ReactNode
    departmentAttendance?: ReactNode
    averageOrderValue?: ReactNode
    customerSegment?: ReactNode
    totalSessions?: ReactNode
    topCampaigns?: ReactNode
    topSellingCategories?: ReactNode
}

const AiDashboardContainer = ({
    header,
    metrics,
    movementPatterns,
    revenueTrend,
    departmentAttendance,
    averageOrderValue,
    customerSegment,
    totalSessions,
    topCampaigns,
}: AiDashboardContainerProps) => {
    return (
        <div className="h-full">
            <Container>
                {header}
                <div className="space-y-4 overflow-hidden">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                        {metrics}
                    </div>
                    {movementPatterns && (
                        <div>{movementPatterns}</div>
                    )}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        <div className="lg:col-span-2 xl:col-span-2">
                            {revenueTrend}
                        </div>
                        <div className="lg:col-span-1 xl:col-span-1">
                            {departmentAttendance}
                        </div>
                        <div className="lg:col-span-1 xl:hidden overflow-hidden">
                            {averageOrderValue}
                        </div>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                        <div className="hidden xl:block">
                            {averageOrderValue}
                        </div>
                        {customerSegment}
                        {totalSessions}
                    </div>
                    {topCampaigns}
                </div>
            </Container>
        </div>
    )
}

export default AiDashboardContainer
