'use client'
import OverflowTabs from '@/components/shared/OverflowTabs'
import { usePathname, useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

type CustomerDetailsContentProps = {
    children?: ReactNode
}

const CustomerDetailsContent = ({ children }: CustomerDetailsContentProps) => {
    const path = usePathname()
    const router = useRouter()

    const segments = path.split('/').filter(Boolean)
    const currentPath = segments[segments.length - 1]

    const tabList = [
        { label: 'Overview', value: 'overview' },
        { label: 'Activity', value: 'activity' },
        { label: 'Deals', value: 'deals' },
        { label: 'Documents', value: 'documents' },
    ]

    const handleTabChange = (value: string) => {
        router.push(`/apps/customers/${segments[2]}/${value}`)
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

export default CustomerDetailsContent
