'use client'

import HrmDashboardContainer from './HrmDashboardContainer'
import TurnoverRate from './TurnoverRate'
import JobLevelDistribution from './JobLevelDistribution'
import PayrollBurnRate from './PayrollBurnRate'
import EmployeeQualityScore from './EmployeeQualityScore'
import EventsCenter from './EventsCenter'
import ComplianceIssues from './ComplianceIssues'
import type { HrmDashboardData } from '../types'

const HrmDashboard = ({ data }: { data: HrmDashboardData }) => {
    return (
        <HrmDashboardContainer
            turnoverWidget={<TurnoverRate data={data.turnover} />}
            jobLevelWidget={<JobLevelDistribution data={data.jobLevel} />}
            payrollWidget={<PayrollBurnRate data={data.payroll} />}
            employeeQualityWidget={
                <EmployeeQualityScore data={data.employeeQuality} />
            }
            complianceWidget={<ComplianceIssues data={data.compliance} />}
            eventsWidget={<EventsCenter data={data.actions} />}
        />
    )
}

export default HrmDashboard
