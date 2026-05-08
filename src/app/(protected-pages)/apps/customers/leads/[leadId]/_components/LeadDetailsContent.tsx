'use client'

import OverflowTabs from '@/components/shared/OverflowTabs'
import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

type LeadDetailsContentProps = {
    children?: ReactNode
}

const LeadDetailsContent = ({ children }: LeadDetailsContentProps) => {
    const path = usePathname()
    const router = useRouter()

    const segments = path.split('/').filter(Boolean)
    const currentPath = segments[segments.length - 1]

    const tabList = [
        { label: 'Overview', value: 'overview' },
        { label: 'Deals', value: 'deals' },
        { label: 'Notes', value: 'notes' },
        { label: 'Activity', value: 'activity' },
    ]

    const handleTabChange = (value: string) => {
        router.push(`/apps/customers/leads/${segments[3]}/${value}`)
    }

    return (
        <div className="w-full flex-1">
            <OverflowTabs
                tabList={tabList}
                value={currentPath}
                onChange={handleTabChange}
            />
            <div className="mt-4 h-full">{children}</div>
        </div>
    )
}

export default LeadDetailsContent
