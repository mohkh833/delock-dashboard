import { NextResponse } from 'next/server'
import { generateHrmDashboardData } from '@/mock/data/hrmData'

export async function GET() {
    const data = generateHrmDashboardData()
    return NextResponse.json(data)
}
