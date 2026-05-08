import AiWriterClient from './_components/AiWriterClient'
import classNames from '@/utils/classNames'
import {
    LAYOUT_INSET_SHELL,
    LAYOUT_STACKED_SIDE,
    LAYOUT_SEAMLESS_SIDE,
} from '@/constants/theme.constant'
import { cookies } from 'next/headers'
import { themeConfig } from '@/configs/theme.config'

export default async function AiWriterPage() {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')?.value
    const layoutType =
        theme && JSON.parse(theme)?.state?.layout?.type
            ? JSON.parse(theme)?.state?.layout?.type
            : themeConfig.layout.type

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
            <AiWriterClient />
        </div>
    )
}
