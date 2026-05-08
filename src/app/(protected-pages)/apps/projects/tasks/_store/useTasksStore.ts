'use client'

import { create } from 'zustand'
import type { Group, Task, ProjectMeta, Member } from '../types'

type TaskDialog = {
    open: boolean
    id: string
}

type TasksState = {
    groups: Group[]
    tasks: Task[]
    projectMeta: ProjectMeta | null
    allMembers: Member[]
    taskDialog: TaskDialog
}

type TasksActions = {
    setTasksData: (data: {
        groups: Group[]
        tasks: Task[]
        projectMeta: ProjectMeta
    }) => void
    setGroups: (updater: (groups: Group[]) => Group[]) => void
    setTasks: (updater: (tasks: Task[]) => Task[]) => void
    setProjectMeta: (updater: (meta: ProjectMeta) => ProjectMeta) => void
    setData: (payload: { key: string; value: string; id: string }) => void
    setTaskDialog: (dialog: TaskDialog) => void
}

const useTasksStore = create<TasksState & TasksActions>((set) => ({
    groups: [],
    tasks: [],
    projectMeta: null,
    allMembers: [],
    taskDialog: { open: false, id: '' },

    setTasksData: (data) =>
        set({
            groups: data.groups,
            tasks: data.tasks,
            projectMeta: data.projectMeta,
            allMembers: data.projectMeta.allMembers,
        }),

    setGroups: (updater) => set((state) => ({ groups: updater(state.groups) })),

    setTasks: (updater) => set((state) => ({ tasks: updater(state.tasks) })),

    setProjectMeta: (updater) =>
        set((state) => ({
            projectMeta: state.projectMeta
                ? updater(state.projectMeta)
                : state.projectMeta,
        })),

    setData: (payload) =>
        set((state) => ({
            tasks: state.tasks.map((task) => {
                if (task.id !== payload.id) return task

                if (payload.key === 'assignee') {
                    const hasMember = task.members.some(
                        (m) => m.id === payload.value,
                    )
                    const members: Member[] = hasMember
                        ? task.members.filter((m) => m.id !== payload.value)
                        : [
                              ...task.members,
                              state.allMembers.find(
                                  (m) => m.id === payload.value,
                              ) as Member,
                          ]
                    return { ...task, members }
                }

                if (payload.key === 'tags') {
                    const tags = task.tags.includes(payload.value)
                        ? task.tags.filter((t) => t !== payload.value)
                        : [...task.tags, payload.value]
                    return { ...task, tags }
                }

                return { ...task, [payload.key]: payload.value }
            }),
        })),

    setTaskDialog: (dialog) => set({ taskDialog: dialog }),
}))

export default useTasksStore
