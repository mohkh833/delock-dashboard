import { NextResponse } from 'next/server'
import { notificationSettings2Data } from '@/mock/data/accountsData'

export async function GET() {
    return NextResponse.json(notificationSettings2Data)
}
