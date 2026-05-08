import { getProjectSettings } from '@/server/actions/projects'
import Notification from './_components/Notification'
import type { SettingsInitialData } from '../types'

export default async function NotificationsPage() {
    const data = await getProjectSettings()
    return <Notification initialData={data as unknown as SettingsInitialData} />
}
