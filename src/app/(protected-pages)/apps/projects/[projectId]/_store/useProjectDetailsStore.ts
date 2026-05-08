import { create } from 'zustand'
import type { Project } from '../types'

type ProjectDetailsState = {
    data: Project | null
    initialLoading: boolean
}

type ProjectDetailsAction = {
    setProjectData: (data: Project) => void
    updateData: (updater: (prev: Project) => Project) => void
}

export const useProjectDetailsStore = create<
    ProjectDetailsState & ProjectDetailsAction
>((set) => ({
    data: null,
    initialLoading: true,
    setProjectData: (data) => set({ data, initialLoading: false }),
    updateData: (updater) =>
        set((state) => {
            if (!state.data) return state
            return { data: updater(state.data) }
        }),
}))
