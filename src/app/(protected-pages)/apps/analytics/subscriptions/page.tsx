import Container from '@/components/shared/Container'
import { getSubscriptionData } from '@/server/actions/analytics'
import SubscriptionsHeader from './_components/SubscriptionsHeader'
import SubscriberChartView from './_components/SubscriberChartView'
import SubscriberLifecycleJourney from './_components/SubscriberLifecycleJourney'
import SubscriberPersonaTable from './_components/SubscriberPersonaTable'
import type { DateRangePreset, SubscriberPersona } from './_components/types'

export default async function SubscriptionsPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string>>
}) {
    const params = await searchParams
    const preset = (params.preset || '180D') as DateRangePreset

    const data = await getSubscriptionData({ preset })

    return (
        <Container>
            <SubscriptionsHeader selectedPreset={preset} />
            <div className="space-y-6">
                <SubscriberChartView
                    trends={data.trends}
                    metrics={data.metrics}
                />
                <SubscriberLifecycleJourney lifecycle={data.lifecycle} />
                <SubscriberPersonaTable
                    personas={{
                        recent: data.personas.recent as SubscriberPersona[],
                        highValue: data.personas
                            .highValue as SubscriberPersona[],
                    }}
                />
            </div>
        </Container>
    )
}
