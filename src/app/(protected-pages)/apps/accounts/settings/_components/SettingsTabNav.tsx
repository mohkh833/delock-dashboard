'use client'

import OverflowTabs from '@/components/shared/OverflowTabs'
import Container from '@/components/shared/Container'
import {
    LiUserCircle,
    LiShieldCircle,
    LiPaintBucket,
    LiBell,
    LiReceiptItem,
    LiBlend2,
} from '@/icons'
import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

const menuList: Array<{
    label: string | ReactNode
    icon: ReactNode
    value: string
}> = [
    { label: 'Profile', icon: <LiUserCircle />, value: 'profile' },
    { label: 'Appearance', icon: <LiPaintBucket />, value: 'appearance' },
    { label: 'Security', icon: <LiShieldCircle />, value: 'security' },
    { label: 'Notifications', icon: <LiBell />, value: 'notifications' },
    { label: 'Billing', icon: <LiReceiptItem />, value: 'billing' },
    { label: 'Integrations', icon: <LiBlend2 />, value: 'integrations' },
]

const BASE_PATH = '/apps/accounts/settings'

const SettingsTabNav = () => {
    const pathname = usePathname()
    const router = useRouter()
    const tab = pathname.split('/').pop() || 'profile'

    const handleTabChange = (value: string) => {
        router.push(`${BASE_PATH}/${value}`)
    }

    return (
        <div className="pt-4 border-b border-gray-200 dark:border-gray-800">
            <Container size="md" className="px-4">
                <h4 className="font-semibold">Settings</h4>
                <div className="mt-4">
                    <OverflowTabs
                        value={tab}
                        onChange={handleTabChange}
                        className="flex justify-between items-center"
                        tabListClass="md:border-0"
                        tabNavClass="min-w-[100px] text-center"
                        tabList={menuList.map((item) => ({
                            ...item,
                            label: (
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            ),
                        }))}
                    />
                </div>
            </Container>
        </div>
    )
}

export default SettingsTabNav
