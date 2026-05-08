import HelpdeskLayoutClient from './_components/HelpdeskLayoutClient'
import classNames from '@/utils/classNames'
import {
    LAYOUT_INSET_SHELL,
    LAYOUT_STACKED_SIDE,
    LAYOUT_SEAMLESS_SIDE,
} from '@/constants/theme.constant'
import { cookies } from 'next/headers'
import { themeConfig } from '@/configs/theme.config'
import { getHelpdeskTickets } from '@/server/actions/customers'
import type { ReactNode } from 'react'

export default async function HelpdeskLayout(props: { children: ReactNode }) {
    const cookieStore = await cookies()
    const theme = cookieStore.get('theme')?.value

    const layoutType =
        theme && JSON.parse(theme)?.state?.layout?.type
            ? JSON.parse(theme)?.state?.layout?.type
            : themeConfig.layout.type

    const ticketData = await getHelpdeskTickets()

    return (
        <div
            className={classNames(
                'h-full overflow-hidden',
                [
                    LAYOUT_INSET_SHELL,
                    LAYOUT_STACKED_SIDE,
                    LAYOUT_SEAMLESS_SIDE,
                ].includes(layoutType) &&
                    'border-t border-gray-200 dark:border-gray-800',
            )}
        >
            <div className="pt-px h-full absolute inset-0 flex min-w-0 overflow-hidden">
                <HelpdeskLayoutClient initialTicketData={ticketData}>
                    {props.children}
                </HelpdeskLayoutClient>
            </div>
        </div>
    )
}
