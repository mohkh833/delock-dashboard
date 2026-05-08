import { getProjectSettings } from '@/server/actions/projects'
import General from './_components/General'
import { SettingsInitialData } from '../types'

export default async function GeneralPage() {
    const data = await getProjectSettings()
    return <General initialData={data as unknown as SettingsInitialData} />
}
