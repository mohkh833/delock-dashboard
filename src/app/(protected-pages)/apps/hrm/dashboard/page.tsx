import { getHrmDashboardData } from '@/server/actions/hrm'
import HrmDashboard from './_components/HrmDashboard'
import type { HrmDashboardData } from './types'

export default async function HrmDashboardPage() {
    const data = await getHrmDashboardData()

    return <HrmDashboard data={data as HrmDashboardData} />
}
