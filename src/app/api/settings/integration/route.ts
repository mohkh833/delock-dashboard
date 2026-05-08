import { NextResponse } from 'next/server'
import { intergrationSettingData } from '@/mock/data/accountsData'

export async function GET() {
    return NextResponse.json(intergrationSettingData)
}
