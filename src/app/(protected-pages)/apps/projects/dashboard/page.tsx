import { getProjectDashboard } from '@/server/actions/projects'
import ProjectDashboard from './_components/ProjectDashboard'
import type { DashboardData } from './types'

export default async function ProjectDashboardPage() {
    const data = await getProjectDashboard()
    return <ProjectDashboard data={data as DashboardData} />
}
