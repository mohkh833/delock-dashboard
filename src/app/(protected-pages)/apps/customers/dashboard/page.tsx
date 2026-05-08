import { getCrmDashboard } from '@/server/actions/customers'
import CrmDashboard from './_components/CrmDashboard'
import type { DashboardFilters, TimeHorizon, CrmDashboardData } from './types'

export default async function CrmDashboardPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string>>
}) {
    const params = await searchParams

    const timeHorizon = (
        ['week', 'month', 'quarter'].includes(params.timeHorizon)
            ? params.timeHorizon
            : 'month'
    ) as TimeHorizon

    const teamSelection = params.teamSelection || 'all'

    const stagesParam = params.stages
    const activeStages = stagesParam
        ? stagesParam.split(',')
        : ['prospecting', 'qualified', 'negotiation', 'closedWon']

    const filters: DashboardFilters = {
        timeHorizon,
        teamSelection,
        pipelineStages: {
            prospecting: activeStages.includes('prospecting'),
            qualified: activeStages.includes('qualified'),
            negotiation: activeStages.includes('negotiation'),
            closedWon: activeStages.includes('closedWon'),
        },
        viewPreferences: {
            applyProbabilityWeighting: params.probabilityWeighting === 'true',
            highlightStalledDeals: params.highlightStalled === 'true',
            currency: params.currency === 'EUR' ? 'EUR' : 'USD',
        },
    }

    const data = await getCrmDashboard({ timeHorizon, teamSelection })

    return (
        <CrmDashboard
            data={data as unknown as CrmDashboardData}
            filters={filters}
        />
    )
}
