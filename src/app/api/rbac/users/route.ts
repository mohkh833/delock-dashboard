import { NextResponse } from 'next/server'
import { getUsersList } from '@/server/actions/accounts'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 25
    const query = searchParams.get('query') || ''
    const status = searchParams.get('status') || ''
    const role = searchParams.get('role') || ''

    const data = await getUsersList({
        pageIndex,
        pageSize,
        query,
        status,
        role,
    })

    return NextResponse.json(data)
}
