import { NextResponse } from 'next/server'
import { securitySettingsData } from '@/mock/data/accountsData'

export async function GET() {
    return NextResponse.json(securitySettingsData)
}
