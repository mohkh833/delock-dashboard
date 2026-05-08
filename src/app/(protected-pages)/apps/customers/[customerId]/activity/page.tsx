import { getCustomerLog } from '@/server/actions/customers'
import CustomerActivity from './_components/CustomerActivity'

export default async function CustomerActivityPage(props: {
    params: Promise<{ customerId: string }>
}) {
    const params = await props.params

    const initialData = await getCustomerLog(params.customerId)

    return <CustomerActivity data={initialData} />
}
