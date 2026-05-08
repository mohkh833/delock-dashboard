import { NextResponse } from 'next/server'
import { taskDetailsData, tasksData } from '@/mock/data/projectsData'

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params
    const taskDetail = taskDetailsData.find((t) => t.id === id)

    if (!taskDetail) {
        return NextResponse.json({ message: 'Task not found' }, { status: 404 })
    }

    const taskBase = tasksData.find((t) => t.id === id)

    return NextResponse.json({ ...taskDetail, ...taskBase })
}
