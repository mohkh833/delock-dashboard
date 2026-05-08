import CustomerDeals from './_components/CustomerDeals'
import { getCustomerDeals } from '@/server/actions/customers'

export default async function CustomerDealsPage(props: {
    params: Promise<{ customerId: string }>
}) {
    const params = await props.params

    const initialData = await getCustomerDeals(params.customerId)

    return <CustomerDeals data={initialData} />
}
