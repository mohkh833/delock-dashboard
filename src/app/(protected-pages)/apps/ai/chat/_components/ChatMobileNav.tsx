'use client'

import { useRef } from 'react'
import ToggleDrawer from '@/components/shared/ToggleDrawer'
import ChatSideNav from './ChatSideNav'
import type { ToggleDrawerRef } from '@/components/shared/ToggleDrawer'

const ChatMobileNav = () => {
    const drawerRef = useRef<ToggleDrawerRef>(null)

    return (
        <div className="xl:hidden">
            <ToggleDrawer
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ref={drawerRef as any}
                bodyClass="p-0"
                closable={false}
            >
                <ChatSideNav
                    className="border-0"
                    bodyClass="p-0"
                    onClick={() => drawerRef.current?.handleCloseDrawer()}
                />
            </ToggleDrawer>
        </div>
    )
}

export default ChatMobileNav
