import { getProjectDetails } from '@/server/actions/projects'
import ProjectDetailsProvider from './_components/ProjectDetailsProvider'
import type { Project } from './types'

export default async function ProjectDetailsPage({
    params,
}: {
    params: Promise<{ projectId: string }>
}) {
    const { projectId } = await params
    const data = await getProjectDetails(projectId)

    return <ProjectDetailsProvider initialData={data as unknown as Project} />
}
