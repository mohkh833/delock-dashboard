'use client'

import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import ScrumboardHeader from './ScrumboardHeader'
import Board from './Board'
import TaskDetailsDialog from './TaskDetailsDialog'
import AddTaskDialog from './AddTaskDialog'
import ColumnDialog from './ColumnDialog'
import DeleteColumnDialog from './DeleteColumnDialog'
import { useScrumboardStore } from '../_store/useScrumboardStore'
import type { GetScrumboardResponse } from '../types'

type ScrumboardProviderProps = {
    initialData: GetScrumboardResponse
}

const ScrumboardProvider = ({ initialData }: ScrumboardProviderProps) => {
    const setScrumboardData = useScrumboardStore((s) => s.setScrumboardData)
    const initialLoading = useScrumboardStore((s) => s.initialLoading)

    useEffect(() => {
        setScrumboardData(initialData)
    }, [initialData, setScrumboardData])

    if (initialLoading) {
        return (
            <div className="flex h-full items-center justify-center">
                <Loading loading />
            </div>
        )
    }

    return (
        <div className="flex flex-col h-full">
            <ScrumboardHeader />
            <Board />
            <TaskDetailsDialog />
            <AddTaskDialog />
            <ColumnDialog />
            <DeleteColumnDialog />
        </div>
    )
}

export default ScrumboardProvider
