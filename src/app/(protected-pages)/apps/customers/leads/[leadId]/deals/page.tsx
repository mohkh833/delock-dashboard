import LeadDeals from './_components/LeadDeals'
import { getCustomerDeals } from '@/server/actions/customers'

export default async function LeadDealsPage(props: {
    params: Promise<{ leadId: string }>
}) {
    const params = await props.params

    const initialData = await getCustomerDeals(params.leadId)

    return <LeadDeals data={initialData} />
}
