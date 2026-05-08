import { getProjects } from '@/server/actions/projects'
import ProjectListProvider from './_components/ProjectListProvider'

export default async function ProjectListPage({
    searchParams,
}: {
    searchParams: Promise<{ query?: string; status?: string }>
}) {
    const { query, status } = await searchParams
    const projectList = await getProjects({ query, status })

    return (
        <ProjectListProvider
            initialData={projectList}
            query={query ?? ''}
            status={status ?? ''}
        />
    )
}
