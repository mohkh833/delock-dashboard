import { getSettingsBilling } from '@/server/actions/accounts'
import Billing from './_components/Billing'
import type { GetSettingsBillingResponse } from '../types'

export default async function BillingPage() {
    const data = await getSettingsBilling()
    return (
        <Billing initialData={data as unknown as GetSettingsBillingResponse} />
    )
}
