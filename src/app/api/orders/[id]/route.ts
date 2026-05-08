import { NextResponse } from 'next/server'
import { getSalesOrder } from '@/services/server/SalesService'

export async function GET(
    _: Request,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params

    const response = await getSalesOrder({ id })

    return NextResponse.json(response)
}
