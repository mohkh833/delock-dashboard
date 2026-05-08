'use client'

import Container from '@/components/shared/Container'
import ListView from './ListView'
import GridView from './GridView'
import EmptyState from '@/components/shared/EmptyState'
import IconFrame from '@/components/shared/IconFrame'
import { useProjectListStore } from '../_store/useProjectListStore'
import { LiBoxSearch } from '@/icons'

const ProjectListContent = () => {
    const projectList = useProjectListStore((s) => s.projectList)
    const initialLoading = useProjectListStore((s) => s.initialLoading)
    const view = useProjectListStore((s) => s.view)
    const deleteProject = useProjectListStore((s) => s.deleteProject)
    const toggleFavorite = useProjectListStore((s) => s.toggleFavorite)
    const changeStatus = useProjectListStore((s) => s.changeStatus)

    return (
        <Container className="p-4">
            {view === 'list' && (
                <ListView
                    data={projectList}
                    onDelete={deleteProject}
                    onToggleFavorite={toggleFavorite}
                    onChangeStatus={changeStatus}
                />
            )}
            {view === 'grid' && (
                <GridView
                    data={projectList}
                    onDelete={deleteProject}
                    onToggleFavorite={toggleFavorite}
                    onChangeStatus={changeStatus}
                />
            )}
            {projectList.length === 0 && !initialLoading && (
                <div className="flex-1 flex flex-col items-center justify-center mt-2">
                    <EmptyState
                        variant="wave"
                        size={280}
                        offset={-48}
                        illustration={
                            <IconFrame>
                                <LiBoxSearch className="text-xl heading-text" />
                            </IconFrame>
                        }
                    >
                        <div className="text-center space-y-2">
                            <h3>No Project Found</h3>
                            <p className="max-w-[400px]">
                                No projects found for the selected filters.
                            </p>
                        </div>
                    </EmptyState>
                </div>
            )}
        </Container>
    )
}

export default ProjectListContent
