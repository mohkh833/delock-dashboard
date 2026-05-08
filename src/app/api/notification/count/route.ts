import { NextResponse } from 'next/server'
import { notificationListData } from '@/mock/data/commonData'

export async function GET() {
    const unreadNotification = notificationListData.filter(
        (notification) => !notification.read,
    )
    return NextResponse.json({ count: unreadNotification.length })
}
