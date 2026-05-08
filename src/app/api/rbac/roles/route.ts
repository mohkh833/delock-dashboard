import { NextResponse } from 'next/server'
import { getRolesList } from '@/server/actions/accounts'

export async function GET() {
    const data = await getRolesList()
    return NextResponse.json(data)
}
