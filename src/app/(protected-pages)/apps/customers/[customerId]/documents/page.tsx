import CustomerDocuments from './_components/CustomerDocuments'
import { getCustomerDocuments } from '@/server/actions/customers'
import type { Documents } from '../types'

export default async function CustomerDocumentsPage(props: {
    params: Promise<{ customerId: string }>
}) {
    const params = await props.params

    const initialData = await getCustomerDocuments(params.customerId)

    return (
        <CustomerDocuments initialData={initialData as unknown as Documents} />
    )
}
