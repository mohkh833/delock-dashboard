import AiChatClient from './_components/AiChatClient'
import { getChatHistory } from '@/server/actions/ai'
import classNames from '@/utils/classNames'
import {
    LAYOUT_INSET_SHELL,
    LAYOUT_STACKED_SIDE,
    LAYOUT_SEAMLESS_SIDE,
} from '@/constants/theme.constant'
import { cookies } from 'next/headers'
import { themeConfig } from '@/configs/theme.config'
import type { ChatHistories } from './types'

export default async function AiChatPage() {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')?.value
    const layoutType =
        theme && JSON.parse(theme)?.state?.layout?.type
            ? JSON.parse(theme)?.state?.layout?.type
            : themeConfig.layout.type

    const initialChatHistory = await getChatHistory()

    return (
        <div
            className={classNames(
                'h-full',
                [
                    LAYOUT_INSET_SHELL,
                    LAYOUT_STACKED_SIDE,
                    LAYOUT_SEAMLESS_SIDE,
                ].includes(layoutType) &&
                    'border-t border-gray-200 dark:border-gray-800',
            )}
        >
            <AiChatClient
                initialChatHistory={
                    initialChatHistory as unknown as ChatHistories
                }
            />
        </div>
    )
}
