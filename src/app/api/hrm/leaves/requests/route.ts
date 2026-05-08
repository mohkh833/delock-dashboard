import { NextResponse } from 'next/server'
import { leaveRequests } from '@/mock/data/hrmData'

export async function GET() {
    return NextResponse.json({
        list: leaveRequests,
        total: leaveRequests.length,
    })
}
