import { getSettingsIntegrations } from '@/server/actions/accounts'
import Integrations from './_components/Integrations'
import type { GetSettingsIntegrationsResponse } from '../types'

export default async function IntegrationsPage() {
    const data = await getSettingsIntegrations()
    return (
        <Integrations initialData={data as GetSettingsIntegrationsResponse} />
    )
}
