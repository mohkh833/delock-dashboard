'use client'

import Container from '@/components/shared/Container'
import OverallTasks from './OverallTasks'
import EffortTracking from './EffortTracking'
import ProjectProgress from './ProjectProgress'
import ProjectTimeline from './ProjectTimeline'
import ProjectList from './ProjectList'
import type { DashboardData } from '../types'

const ProjectDashboard = ({ data }: { data: DashboardData }) => {
    return (
        <Container>
            <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    <OverallTasks data={data.taskDistribution} />
                    <EffortTracking data={data.performance} />
                    <ProjectProgress
                        data={data.progress}
                        className="md:col-span-2 xl:col-span-1"
                    />
                </div>
                <ProjectTimeline data={data.timeline} />
                <ProjectList data={data.projects} />
            </div>
        </Container>
    )
}

export default ProjectDashboard
