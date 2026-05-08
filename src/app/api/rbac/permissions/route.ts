import { NextResponse } from 'next/server'
import { getPermissionsList } from '@/server/actions/accounts'

export async function GET() {
    const data = await getPermissionsList()
    return NextResponse.json(data)
}
