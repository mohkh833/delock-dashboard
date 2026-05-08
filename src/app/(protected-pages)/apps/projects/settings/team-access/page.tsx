import { getProjectSettings } from '@/server/actions/projects'
import TeamAccess from './_components/TeamAccess'
import type { SettingsInitialData } from '../types'

export default async function TeamAccessPage() {
    const data = await getProjectSettings()
    return <TeamAccess initialData={data as unknown as SettingsInitialData} />
}
