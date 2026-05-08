'use client'

import { useEffect } from 'react'
import { useProjectListStore } from '../_store/useProjectListStore'
import ProjectListHeader from './ProjectListHeader'
import ProjectListContent from './ProjectListContent'
import type { Project } from '../_store/useProjectListStore'

type ProjectListProviderProps = {
    initialData: Project[]
    query: string
    status: string
}

const ProjectListProvider = ({
    initialData,
    query,
    status,
}: ProjectListProviderProps) => {
    const setProjectList = useProjectListStore((s) => s.setProjectList)

    useEffect(() => {
        setProjectList(initialData)
    }, [initialData, setProjectList])

    return (
        <div className="flex flex-col h-full">
            <ProjectListHeader query={query} status={status} />
            <ProjectListContent />
        </div>
    )
}

export default ProjectListProvider
