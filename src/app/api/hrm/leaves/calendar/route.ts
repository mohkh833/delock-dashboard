import { NextResponse } from 'next/server'
import { leaveCalendarEvents } from '@/mock/data/hrmData'

export async function GET() {
    return NextResponse.json(leaveCalendarEvents)
}
