import CustomerOverview from './_components/CustomerOverview'
import { getCustomerDetail } from '@/server/actions/customers'
import type { Customer } from '../types'

export default async function CustomerOverviewPage(props: {
    params: Promise<{ customerId: string }>
}) {
    const params = await props.params

    const initialData = await getCustomerDetail(params.customerId)

    return <CustomerOverview initialData={initialData as unknown as Customer} />
}
