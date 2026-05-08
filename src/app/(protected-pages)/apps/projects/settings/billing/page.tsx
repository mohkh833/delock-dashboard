import { getProjectSettings } from '@/server/actions/projects'
import BillingAndUsage from './_components/BillingAndUsage'
import type { SettingsInitialData } from '../types'

export default async function BillingPage() {
    const data = await getProjectSettings()
    return (
        <BillingAndUsage initialData={data as unknown as SettingsInitialData} />
    )
}
