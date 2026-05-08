'use client'

import { useEffect } from 'react'
import { useProjectDetailsStore } from '../_store/useProjectDetailsStore'
import ProjectDetailsHeader from './ProjectDetailsHeader'
import ProjectDetailsContent from './ProjectDetailsContent'
import Loading from '@/components/shared/Loading'
import type { Project } from '../types'

type ProjectDetailsProviderProps = {
    initialData: Project
}

const ProjectDetailsProvider = ({
    initialData,
}: ProjectDetailsProviderProps) => {
    const setProjectData = useProjectDetailsStore((s) => s.setProjectData)
    const data = useProjectDetailsStore((s) => s.data)
    const initialLoading = useProjectDetailsStore((s) => s.initialLoading)

    useEffect(() => {
        setProjectData(initialData)
    }, [initialData, setProjectData])

    if (initialLoading || !data) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loading loading />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <ProjectDetailsHeader data={data} />
            <ProjectDetailsContent data={data} />
        </div>
    )
}

export default ProjectDetailsProvider
