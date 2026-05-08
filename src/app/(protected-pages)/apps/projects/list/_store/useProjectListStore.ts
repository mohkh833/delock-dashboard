import { create } from 'zustand'

export type Project = {
    id: string
    name: string
    client: string
    status: string
    startDate: string
    dueDate: string
    progress: number
    favorite: boolean
    description: string
    img: string
    members: {
        id: string
        name: string
        email: string
        img: string
    }[]
    tasks: {
        total: number
        completed: number
    }
    priority: string
}

type ProjectListState = {
    projectList: Project[]
    view: 'list' | 'grid'
    initialLoading: boolean
}

type ProjectListAction = {
    setProjectList: (list: Project[]) => void
    setView: (view: 'list' | 'grid') => void
    deleteProject: (id: string) => void
    toggleFavorite: (id: string) => void
    changeStatus: (id: string, status: string) => void
    addProject: (project: Project) => void
}

export const useProjectListStore = create<ProjectListState & ProjectListAction>(
    (set) => ({
        projectList: [],
        view: 'list',
        initialLoading: true,
        setProjectList: (list) =>
            set({ projectList: list, initialLoading: false }),
        setView: (view) => set({ view }),
        deleteProject: (id) =>
            set((state) => ({
                projectList: state.projectList.filter((p) => p.id !== id),
            })),
        toggleFavorite: (id) =>
            set((state) => ({
                projectList: state.projectList.map((p) =>
                    p.id === id ? { ...p, favorite: !p.favorite } : p,
                ),
            })),
        changeStatus: (id, status) =>
            set((state) => ({
                projectList: state.projectList.map((p) =>
                    p.id === id ? { ...p, status } : p,
                ),
            })),
        addProject: (project) =>
            set((state) => ({
                projectList: [project, ...state.projectList],
            })),
    }),
)
