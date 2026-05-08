import { getProjectSettings } from '@/server/actions/projects'
import ConnectedApps from './_components/ConnectedApps'
import type { SettingsInitialData } from '../types'
export default async function ConnectedAppsPage() {
    const data = await getProjectSettings()
    return (
        <ConnectedApps initialData={data as unknown as SettingsInitialData} />
    )
}
