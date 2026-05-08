import { NextResponse } from 'next/server'
import { getRolesByDepartments } from '@/mock/data/hrmData'

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const departments = searchParams.get('departments') || ''
    const deptList = departments.split(',').filter(Boolean)

    const roles = getRolesByDepartments(deptList)
    return NextResponse.json(roles)
}
