import { NextResponse } from 'next/server'
import { userDetailData } from '@/mock/data/usersData'

const boardMembersId = ['3', '2', '4', '7', '1', '10', '9']

export async function GET() {
    const participantMembers = userDetailData.filter((user) =>
        boardMembersId.includes(user.id),
    )

    return NextResponse.json({
        participantMembers,
        allMembers: userDetailData,
    })
}
