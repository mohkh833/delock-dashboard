import { getAnalyticDashboard } from '@/server/actions/analytics'
import AnalyticDashboardContainer from './_components/AnalyticDashboardContainer'
import RecurringRevenueHealth from './_components/RecurringRevenueHealth'
import AcquisitionChannels from './_components/AcquisitionChannels'
import CashRunway from './_components/CashRunway'
import NetRevenueRetention from './_components/NetRevenueRetention'
import ChurnMetrics from './_components/ChurnMetrics'
import RevenuePlan from './_components/RevenuePlan'
import AtRiskAccounts from './_components/AtRiskAccounts'
import PlatformStability from './_components/PlatformStability'
import TrialFunnel from './_components/TrialFunnel'
import type { CashRunwayData, AtRiskAccountsData } from './types'

export default async function AnalyticDashboardPage() {
    const data = await getAnalyticDashboard()

    return (
        <AnalyticDashboardContainer
            recurringRevenueHealth={<RecurringRevenueHealth data={data.arr} />}
            channels={<AcquisitionChannels data={data.channels} />}
            cashRunway={<CashRunway data={data.cashRunway as CashRunwayData} />}
            nrr={<NetRevenueRetention data={data.nrr} />}
            churn={<ChurnMetrics data={data.churn} />}
            plans={<RevenuePlan data={data.plans} />}
            atRiskAccounts={
                <AtRiskAccounts
                    data={data.atRiskAccounts as AtRiskAccountsData}
                />
            }
            platformStability={
                <PlatformStability data={data.platformStability} />
            }
            trialFunnel={<TrialFunnel data={data.trialFunnel} />}
        />
    )
}
