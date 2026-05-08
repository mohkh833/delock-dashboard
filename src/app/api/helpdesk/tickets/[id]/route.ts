import { NextRequest, NextResponse } from 'next/server'
import {
    helpdeskTicketData,
    helpdeskTicketDetailsData,
} from '@/mock/data/ticketsData'

export async function GET(
    _request: NextRequest,
    { params }: { params: Promise<{ id: string }> },
) {
    const { id } = await params

    const basicData = helpdeskTicketData.find((ticket) => ticket.id === id)
    const detailsData = helpdeskTicketDetailsData.find(
        (ticket) => ticket.id === id,
    )

    if (!basicData) {
        return NextResponse.json({}, { status: 404 })
    }

    return NextResponse.json({ ...basicData, ...detailsData })
}
