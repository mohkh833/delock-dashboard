import { NextRequest, NextResponse } from 'next/server'
import { generatedImageData } from '@/mock/data/aiData'

export async function POST(request: NextRequest) {
    const body = await request.json()
    const { prompt } = body as { prompt: string }

    const imageSet = generatedImageData[
        Math.floor(Math.random() * generatedImageData.length)
    ].map((img) => ({ ...img, prompt }))

    await new Promise((resolve) => setTimeout(resolve, 2000))

    return NextResponse.json(imageSet)
}
