import { NextResponse } from 'next/server'
import { getPendingUsersList } from '@/server/actions/accounts'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 25
    const query = searchParams.get('query') || ''
    const requestedRole = searchParams.get('requestedRole') || ''

    const data = await getPendingUsersList({
        pageIndex,
        pageSize,
        query,
        requestedRole,
    })

    return NextResponse.json(data)
}
