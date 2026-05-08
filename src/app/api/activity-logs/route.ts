import { NextResponse } from 'next/server'
import { logData } from '@/mock/data/logData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const activityIndex = parseInt(searchParams.get('activityIndex') || '1', 10)

    const maxGetItem = 3
    const count = (activityIndex - 1) * maxGetItem
    let loadable = true

    if (count >= logData.length) {
        loadable = false
    }

    const list = logData.slice(count, activityIndex * maxGetItem)

    return NextResponse.json({
        index: activityIndex,
        list,
        loadable,
    })
}
