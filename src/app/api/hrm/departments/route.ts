import { NextResponse } from 'next/server'
import { departments } from '@/mock/data/hrmData'

export async function GET() {
    return NextResponse.json(departments)
}
