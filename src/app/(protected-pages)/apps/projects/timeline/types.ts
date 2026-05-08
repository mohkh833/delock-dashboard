import type { Task } from '@/components/shared/Gantt/types'

type Member = {
    id: string
    name: string
    email: string
    img: string
    permissionRole: string
    status: string
}

export type TaskMeta = {
    meta: {
        assignee?: {
            id: string
            name: string
            img?: string
        }[]
        priority: 'Low' | 'Medium' | 'High'
        status: 'To Do' | 'In Progress' | 'Under Review' | 'Completed'
        description?: string
    }
}

export type TimelineTask = Task & TaskMeta

export type ProjectMember = {
    id: string
    name: string
    email: string
    img?: string
    role?: string
}

export type TimelineProject = {
    id: string
    title: string
    description: string
    participantMembers: Member[]
    allMembers: Member[]
}

export type GetProjectTimelineResponse = {
    projects: TimelineProject
    tasks: TimelineTask[]
    sprints: { value: string; label: string }[]
}
