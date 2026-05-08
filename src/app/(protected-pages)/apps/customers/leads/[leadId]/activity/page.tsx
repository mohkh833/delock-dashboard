import { getCustomerLog } from '@/server/actions/customers'
import LeadActivity from './_components/LeadActivity'

export default async function LeadActivityPage(props: {
    params: Promise<{ leadId: string }>
}) {
    const params = await props.params

    const initialData = await getCustomerLog(params.leadId)

    return <LeadActivity data={initialData} />
}
