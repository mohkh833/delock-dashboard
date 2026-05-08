'use client'

import Container from '@/components/shared/Container'
import PricingHeader from './PricingHeader'
import Plans from './Plans'
import Faq from './Faq'
import PaymentDialog from './PaymentDialog'
import type { GetPricingPlanResponse } from '../types'

const Pricing = ({ data }: { data: GetPricingPlanResponse }) => {
    return (
        <Container size="md">
            <PricingHeader />
            <div className="py-4">
                <Plans data={data.plans} />
            </div>
            <Faq />
            <PaymentDialog />
        </Container>
    )
}

export default Pricing
