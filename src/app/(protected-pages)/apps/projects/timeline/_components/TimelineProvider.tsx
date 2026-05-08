'use client'

import { useState, useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import { ViewMode } from '@/components/shared/Gantt/constants'
import { useTimelineStore } from '../_store/useTimelineStore'
import TimelineHeader from './TimelineHeader'
import TimelineContent from './TimelineContent'
import dayjs from 'dayjs'
import type { GetProjectTimelineResponse } from '../types'

type TimelineProviderProps = {
    initialData: GetProjectTimelineResponse
}

const TimelineProvider = ({ initialData }: TimelineProviderProps) => {
    const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.Week)

    const setTimelineData = useTimelineStore((s) => s.setTimelineData)
    const initialLoading = useTimelineStore((s) => s.initialLoading)

    useEffect(() => {
        const tasks = initialData.tasks.map((task) => ({
            ...task,
            start: dayjs(task.start).toDate(),
            end: dayjs(task.end).toDate(),
        }))

        setTimelineData({
            ...initialData,
            tasks,
        })
    }, [initialData, setTimelineData])

    return (
        <Loading loading={initialLoading} className="h-full" type="cover">
            <TimelineHeader
                viewMode={viewMode}
                onViewModeChange={setViewMode}
            />
            <TimelineContent viewMode={viewMode} />
        </Loading>
    )
}

export default TimelineProvider
