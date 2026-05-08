import { create } from 'zustand'
import type { Column, Task, ProjectMeta, GetScrumboardResponse } from '../types'

type ColumnDialogState = {
    open: boolean
    type: 'edit' | 'add' | ''
}

type ScrumboardState = {
    // data
    columns: Column[]
    tasks: Task[]
    projectMeta: ProjectMeta | null
    initialLoading: boolean
    // ui
    selectedTask: string
    selectedColumn: string
    taskDialogOpen: boolean
    addTaskDialogOpen: boolean
    deleteColumnDialogOpen: boolean
    columnDialog: ColumnDialogState
    query: string
    displayedColumns: string[]
}

type ScrumboardAction = {
    setScrumboardData: (data: GetScrumboardResponse) => void
    setColumns: (callback: (data: Column[]) => Column[]) => void
    setTasks: (callback: (data: Task[]) => Task[]) => void
    setProjectMeta: (callback: (data: ProjectMeta) => ProjectMeta) => void
    setSelectedTask: (id: string) => void
    setSelectedColumn: (id: string) => void
    setTaskDialogOpen: (open: boolean) => void
    setAddTaskDialogOpen: (open: boolean) => void
    setDeleteColumnDialogOpen: (open: boolean) => void
    setColumnDialog: (payload: ColumnDialogState) => void
    setQuery: (payload: string) => void
    setDisplayedColumns: (payload: string[]) => void
}

export const useScrumboardStore = create<ScrumboardState & ScrumboardAction>(
    (set) => ({
        columns: [],
        tasks: [],
        projectMeta: null,
        initialLoading: true,
        selectedTask: '',
        selectedColumn: '',
        taskDialogOpen: false,
        addTaskDialogOpen: false,
        deleteColumnDialogOpen: false,
        columnDialog: { open: false, type: '' },
        query: '',
        displayedColumns: [],

        setScrumboardData: (data) =>
            set({
                columns: data.columns,
                tasks: data.tasks,
                projectMeta: data.projectMeta,
                displayedColumns: data.columns.map((col) => col.id),
                initialLoading: false,
            }),

        setColumns: (callback) =>
            set((state) => ({ columns: callback(state.columns) })),

        setTasks: (callback) =>
            set((state) => ({ tasks: callback(state.tasks) })),

        setProjectMeta: (callback) =>
            set((state) => {
                if (!state.projectMeta) return state
                return { projectMeta: callback(state.projectMeta) }
            }),

        setSelectedTask: (id) => set({ selectedTask: id }),
        setSelectedColumn: (id) => set({ selectedColumn: id }),
        setTaskDialogOpen: (open) => set({ taskDialogOpen: open }),
        setAddTaskDialogOpen: (open) => set({ addTaskDialogOpen: open }),
        setDeleteColumnDialogOpen: (open) =>
            set({ deleteColumnDialogOpen: open }),
        setColumnDialog: (payload) => set({ columnDialog: payload }),
        setQuery: (payload) => set({ query: payload }),
        setDisplayedColumns: (payload) => set({ displayedColumns: payload }),
    }),
)
