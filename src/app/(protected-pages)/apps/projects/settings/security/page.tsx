import { getProjectSettings } from '@/server/actions/projects'
import Security from './_components/Security'
import type { SettingsInitialData } from '../types'

export default async function SecurityPage() {
    const data = await getProjectSettings()
    return <Security initialData={data as unknown as SettingsInitialData} />
}
