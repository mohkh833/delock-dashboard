'use client'

import { create } from 'zustand'
import type {
    TimelineTask,
    TimelineProject,
    GetProjectTimelineResponse,
} from '../types'

type TimelineState = {
    tasks: TimelineTask[]
    projects: TimelineProject | null
    sprints: { value: string; label: string }[]
    initialLoading: boolean
    selectedSprint: string
    selectedTask: TimelineTask | null
}

type TimelineAction = {
    setTimelineData: (data: GetProjectTimelineResponse) => void
    setTasks: (tasks: TimelineTask[]) => void
    setProjects: (callback: (data: TimelineProject) => TimelineProject) => void
    setSelectedSprint: (sprint: string) => void
    setSelectedTask: (task: TimelineTask) => void
}

const initialState: TimelineState = {
    tasks: [],
    projects: null,
    sprints: [],
    initialLoading: true,
    selectedSprint: '',
    selectedTask: null,
}

export const useTimelineStore = create<TimelineState & TimelineAction>(
    (set, get) => ({
        ...initialState,
        setTimelineData: (data) => {
            set({
                tasks: data.tasks,
                projects: data.projects,
                sprints: data.sprints,
                initialLoading: false,
            })
        },
        setTasks: (tasks) => {
            set({ tasks })
        },
        setProjects: (callback) => {
            const { projects } = get()
            if (projects) {
                set({ projects: callback(projects) })
            }
        },
        setSelectedSprint: (sprint) => {
            set({ selectedSprint: sprint })
        },
        setSelectedTask: (task) => {
            set({ selectedTask: task })
        },
    }),
)
