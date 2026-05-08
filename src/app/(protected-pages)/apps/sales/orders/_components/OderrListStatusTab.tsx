'use client'
import Tabs from '@/components/ui/Tabs'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import type { OrderListSearchParams } from './types'

const { TabNav, TabList } = Tabs

const CustomerListStatusTab = ({
    searchParams,
}: {
    searchParams: OrderListSearchParams
}) => {
    const appendQueryParams = useAppendQueryParams()

    return (
        <Tabs
            className="print:hidden"
            value={searchParams.paymentStatus ?? ''}
            onChange={(val) => appendQueryParams({ paymentStatus: val })}
        >
            <TabList>
                <TabNav value="">All</TabNav>
                <TabNav value="paid">Paid</TabNav>
                <TabNav value="unpaid">Unpaid</TabNav>
            </TabList>
        </Tabs>
    )
}

export default CustomerListStatusTab
