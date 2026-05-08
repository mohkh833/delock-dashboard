import { NextResponse } from 'next/server'
import { notificationListData } from '@/mock/data/commonData'

export async function GET() {
    return NextResponse.json(notificationListData)
}
