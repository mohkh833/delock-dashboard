'use client'

import Tabs from '@/components/ui/Tabs'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useSearchParams } from 'next/navigation'

const { TabNav, TabList } = Tabs

const CustomerListStatusTab = () => {
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()
    const status = searchParams.get('status') || ''

    const handleTabChange = (val: string) => {
        appendQueryParams({ status: val, pageIndex: '1' })
    }

    return (
        <Tabs value={status} onChange={handleTabChange}>
            <TabList>
                <TabNav value="">All Customers</TabNav>
                <TabNav value="active">Active</TabNav>
                <TabNav value="inactive">Inactive</TabNav>
            </TabList>
        </Tabs>
    )
}

export default CustomerListStatusTab
