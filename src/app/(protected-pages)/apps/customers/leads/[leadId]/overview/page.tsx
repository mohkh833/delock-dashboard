import LeadOverview from './_components/LeadOverview'
import { getCustomerDetail } from '@/server/actions/customers'
import type { Lead } from '../types'

export default async function LeadOverviewPage(props: {
    params: Promise<{ leadId: string }>
}) {
    const params = await props.params

    const initialData = await getCustomerDetail(params.leadId)

    return <LeadOverview data={initialData as unknown as Lead} />
}
