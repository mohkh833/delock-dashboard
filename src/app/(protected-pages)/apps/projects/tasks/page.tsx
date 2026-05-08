import { getTasks } from '@/server/actions/projects'
import TasksProvider from './_components/TasksProvider'
import type { GetTasksResponse } from './types'

export default async function TasksPage() {
    const data = await getTasks()
    return <TasksProvider initialData={data as unknown as GetTasksResponse} />
}
