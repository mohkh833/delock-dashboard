import { NextResponse } from 'next/server'
import { generatedArticleData } from '@/mock/data/aiData'

export async function POST() {
    const response = generatedArticleData[0]

    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json(response)
}
