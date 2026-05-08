import LeadNotes from './_components/LeadNotes'
import { getCustomerDetail } from '@/server/actions/customers'
import type { Lead } from '../types'

export default async function LeadNotesPage(props: {
    params: Promise<{ leadId: string }>
}) {
    const params = await props.params

    const initialData = await getCustomerDetail(params.leadId)

    return <LeadNotes initialData={initialData as unknown as Lead} />
}
