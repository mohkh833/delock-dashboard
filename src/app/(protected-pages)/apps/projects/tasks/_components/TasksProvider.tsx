'use client'

import { useEffect } from 'react'
import useTasksStore from '../_store/useTasksStore'
import TasksHeader from './TasksHeader'
import TaskList from './TaskList'
import TaskDetailsDialog from './TaskDetailsDialog'
import type { GetTasksResponse } from '../types'

type TasksProviderProps = {
    initialData: GetTasksResponse
}

const TasksProvider = ({ initialData }: TasksProviderProps) => {
    const setTasksData = useTasksStore((state) => state.setTasksData)

    useEffect(() => {
        setTasksData(initialData)
    }, [initialData, setTasksData])

    return (
        <div className="flex flex-col h-full">
            <TasksHeader />
            <TaskList />
            <TaskDetailsDialog />
        </div>
    )
}

export default TasksProvider
