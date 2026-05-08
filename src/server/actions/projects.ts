'use server'
import {
    projectDashboardData,
    projectListData,
    projectDetailsData,
    scrumboardColumnData,
    tasksData,
    projectMetaData,
    projectSettingsData,
} from '@/mock/data/projectsData'
import { intergrationSettingData } from '@/mock/data/accountsData'
import { auditLogData } from '@/mock/data/logData'
import { userDetailData } from '@/mock/data/usersData'
import { timelineProjects, allTimelineTasks } from '@/mock/data/timelineData'
import sleep from '@/utils/sleep'

const boardMembersId = ['3', '2', '4', '7', '1', '10', '9']

export async function getProjectDashboard() {
    await sleep(500)
    return projectDashboardData
}

export async function getProjects(params?: {
    query?: string
    status?: string
}) {
    let data = [...projectListData]

    if (params?.status) {
        data = data.filter((p) => p.status === params.status)
    }

    if (params?.query) {
        const q = params.query.toLowerCase()
        data = data.filter((p) => p.name.toLowerCase().includes(q))
    }

    return data
}

export async function getProjectDetails(projectId: string) {
    const base = projectListData.find((p) => p.id === projectId)
    if (!base) return null

    const comments = base.comments.map((c) => ({
        ...c,
        replies: [] as typeof base.comments,
        reactions: [] as Array<{
            emoji: string
            count: number
            reacted: boolean
        }>,
    }))

    return {
        ...base,
        ...projectDetailsData,
        id: base.id,
        comments,
    }
}

export async function getScrumboard() {
    await sleep(300)

    const participantMembers = userDetailData.filter((user) =>
        boardMembersId.includes(user.id),
    )

    return {
        columns: scrumboardColumnData,
        tasks: tasksData.slice(0, 11),
        projectMeta: {
            ...projectMetaData,
            participantMembers,
            allMembers: userDetailData,
        },
    }
}

export async function getProjectSettings() {
    await sleep(300)

    const participantMembersId = ['3', '2', '4', '7', '1']
    const participantMembers = userDetailData.filter((user) =>
        participantMembersId.includes(user.id),
    )

    return {
        ...projectSettingsData,
        integrations: intergrationSettingData,
        allMembers: userDetailData,
        participantMembers,
        invitedMembers: [userDetailData[11], userDetailData[12]],
    }
}

export async function getProjectAuditLog(params: {
    pageIndex: number
    pageSize: number
    query?: string
    sortKey?: string
    sortOrder?: string
    range?: string[]
}) {
    await sleep(300)

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let data = [...(auditLogData as any[])]
    const { pageIndex, pageSize, query } = params

    if (query) {
        const q = query.toLowerCase()
        data = data.filter(
            (log) =>
                log.actor?.name?.toLowerCase().includes(q) ||
                log.action?.toLowerCase().includes(q),
        )
    }

    const total = data.length
    const start = (pageIndex - 1) * pageSize
    const list = data.slice(start, start + pageSize)

    return { list, total }
}

export async function getTasks() {
    await sleep(300)

    const participantMembersId = ['3', '2', '4', '7', '1']
    const participantMembers = userDetailData.filter((user) =>
        participantMembersId.includes(user.id),
    )

    return {
        groups: scrumboardColumnData,
        tasks: tasksData,
        projectMeta: {
            ...projectMetaData,
            participantMembers,
            allMembers: userDetailData,
        },
    }
}

export async function getTimeline() {
    await sleep(300)

    const project = timelineProjects[0]

    return {
        projects: {
            id: project.id,
            title: project.name,
            description: project.description,
            participantMembers: project.members,
            allMembers: project.members,
        },
        tasks: allTimelineTasks,
        sprints: project.sprints,
    }
}
