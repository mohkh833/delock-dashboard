'use client'

import Button from '@/components/ui/Button'
import Dialog from '@/components/ui/Dialog'
import TaskDetails from '@/components/view/TaskDetails'
import { priorityMap, tagsMap } from '../utils'
import { useScrumboardStore } from '../_store/useScrumboardStore'
import sleep from '@/utils/sleep'
import { LuX } from 'react-icons/lu'
import type { Task } from '../types'
import type { Dispatch, SetStateAction } from 'react'

const TaskDetailsDialog = () => {
    const selectedTask = useScrumboardStore((s) => s.selectedTask)
    const taskDialogOpen = useScrumboardStore((s) => s.taskDialogOpen)
    const setTaskDialogOpen = useScrumboardStore((s) => s.setTaskDialogOpen)
    const setSelectedTask = useScrumboardStore((s) => s.setSelectedTask)
    const projectMeta = useScrumboardStore((s) => s.projectMeta)

    const handleClose = async () => {
        setTaskDialogOpen(false)
        await sleep(200)
        setSelectedTask('')
    }

    const handleSave = async (
        payload: Pick<
            Task,
            | 'subject'
            | 'description'
            | 'members'
            | 'tags'
            | 'priority'
            | 'dueDate'
        >,
        setIsSaving: Dispatch<SetStateAction<boolean>>,
    ) => {
        console.log('payload', payload)
        setIsSaving(true)
        await sleep(500)
        setTaskDialogOpen(false)
        await sleep(200)
        setSelectedTask('')
        setIsSaving(false)
    }

    return (
        <Dialog
            isOpen={taskDialogOpen}
            onClose={handleClose}
            closable={false}
            width={650}
            className="p-0"
        >
            <TaskDetails
                taskId={selectedTask}
                cornerContent={
                    <Button
                        size="sm"
                        variant="ghost"
                        icon={<LuX />}
                        onClick={handleClose}
                    />
                }
                onSave={handleSave}
                onCancel={handleClose}
                priorityList={priorityMap}
                tagsList={tagsMap}
                assigneeList={projectMeta?.allMembers || []}
            />
        </Dialog>
    )
}

export default TaskDetailsDialog
