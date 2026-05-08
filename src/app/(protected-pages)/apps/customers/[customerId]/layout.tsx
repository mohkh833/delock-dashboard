import CustomerDetailsInfo from './_components/CustomerDetailsInfo'
import CustomerDetailsContent from './_components/CustomerDetailsContent'
import { getCustomerDetail } from '@/server/actions/customers'
import type { Customer } from './types'
import type { ReactNode } from 'react'

export default async function CustomerDetailsLayout(props: {
    children: ReactNode
    params: Promise<{ customerId: string }>
}) {
    const params = await props.params

    const customer = await getCustomerDetail(params.customerId)

    return (
        <div className="flex flex-col xl:flex-row gap-4 h-full">
            <div className="min-w-[260px] 2xl:min-w-[260px]">
                <CustomerDetailsInfo data={customer as unknown as Customer} />
            </div>
            <CustomerDetailsContent>{props.children}</CustomerDetailsContent>
        </div>
    )
}
