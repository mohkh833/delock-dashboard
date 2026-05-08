import { NextResponse } from 'next/server'
import { profileSettingsData } from '@/mock/data/accountsData'

export async function GET() {
    return NextResponse.json(profileSettingsData)
}
