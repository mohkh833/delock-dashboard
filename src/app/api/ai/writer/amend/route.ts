import { NextResponse } from 'next/server'
import { generatedAmendData } from '@/mock/data/aiData'
import uniqueId from 'lodash/uniqueId'
import dayjs from 'dayjs'

export async function POST() {
    const response = {
        id: uniqueId('ai-writer-'),
        choices: [
            {
                finish_reason: 'stop',
                index: 0,
                message: {
                    content:
                        generatedAmendData[
                            Math.floor(
                                Math.random() * generatedAmendData.length,
                            )
                        ],
                    role: 'assistant',
                },
            },
        ],
        created: dayjs().unix(),
        model: 'gpt-4',
    }

    await new Promise((resolve) => setTimeout(resolve, 800))

    return NextResponse.json(response)
}
