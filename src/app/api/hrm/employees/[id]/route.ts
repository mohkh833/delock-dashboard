import { NextResponse } from 'next/server'
import { employeeData } from '@/mock/data/hrmData'

export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params
    const employee = employeeData.find((emp) => emp.id === id)

    if (!employee) {
        return NextResponse.json(
            { error: 'Employee not found' },
            { status: 404 },
        )
    }

    return NextResponse.json(employee)
}
