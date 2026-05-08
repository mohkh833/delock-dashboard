import LeadProfile from './_components/LeadProfile'
import LeadDetailsContent from './_components/LeadDetailsContent'
import { getCustomerDetail } from '@/server/actions/customers'
import type { Lead } from './types'
import type { ReactNode } from 'react'

export default async function LeadDetailsLayout(props: {
    children: ReactNode
    params: Promise<{ leadId: string }>
}) {
    const params = await props.params
    const lead = await getCustomerDetail(params.leadId)

    return (
        <div className="max-w-[1200px] w-full mx-auto">
            <LeadProfile data={lead as unknown as Lead} />
            <div className="mt-4">
                <LeadDetailsContent>{props.children}</LeadDetailsContent>
            </div>
        </div>
    )
}
