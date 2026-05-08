import { NextResponse } from 'next/server'
import { billingSettingsData } from '@/mock/data/accountsData'

export async function GET() {
    return NextResponse.json(billingSettingsData)
}
