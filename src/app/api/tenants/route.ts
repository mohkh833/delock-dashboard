import { NextResponse } from 'next/server'
import { tenantListData } from '@/mock/data/commonData'

export async function GET() {
    return NextResponse.json(tenantListData)
}
