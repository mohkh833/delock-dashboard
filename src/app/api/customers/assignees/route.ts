import { NextResponse } from 'next/server'
import { userDetailData } from '@/mock/data/usersData'

export async function GET() {
    return NextResponse.json({
        allMembers: userDetailData.slice(0, 10),
    })
}
