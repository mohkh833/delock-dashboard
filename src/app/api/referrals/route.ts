import { NextResponse } from 'next/server'
import { referralData } from '@/mock/data/accountsData'

export async function GET() {
    return NextResponse.json({ data: referralData })
}
