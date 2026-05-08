import { getPricingPlans } from '@/server/actions/accounts'
import Pricing from './_components/Pricing'

export default async function PricingPage() {
    const data = await getPricingPlans()
    return <Pricing data={data} />
}
