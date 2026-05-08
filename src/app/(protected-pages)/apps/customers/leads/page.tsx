import { getLeadsList } from '@/server/actions/customers'
import Leads from './_components/Leads'

export default async function LeadsPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams

    const pageIndex = Number(searchParams.pageIndex) || 1
    const pageSize = Number(searchParams.pageSize) || 25
    const sortKey = (searchParams.sortKey as string) || ''
    const sortOrder = (searchParams.sortOrder as string) || ''
    const query = (searchParams.query as string) || ''
    const leadStatus = (searchParams.leadStatus as string) || ''
    const probability = (searchParams.probability as string) || ''
    const customerLabel = (searchParams.customerLabel as string) || ''

    const initialData = await getLeadsList({
        pageIndex,
        pageSize,
        sortKey,
        sortOrder,
        query,
        leadStatus,
        probability,
        customerLabel,
    })

    return <Leads data={initialData} />
}
