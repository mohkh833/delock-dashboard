import { NextResponse } from 'next/server'
import { leaveStatistics } from '@/mock/data/hrmData'

export async function GET() {
    return NextResponse.json(leaveStatistics)
}
