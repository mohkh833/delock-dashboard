import { NextResponse } from 'next/server'
import { employeeLeaveDetails } from '@/mock/data/hrmData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const employeeId = searchParams.get('employeeId')
    const eventId = searchParams.get('eventId')

    if (!employeeId || !eventId) {
        return NextResponse.json(
            { error: 'employeeId and eventId are required' },
            { status: 400 },
        )
    }

    const key = `${employeeId}-${eventId}`
    const detail = employeeLeaveDetails[key]

    if (!detail) {
        return NextResponse.json(null)
    }

    return NextResponse.json(detail)
}
