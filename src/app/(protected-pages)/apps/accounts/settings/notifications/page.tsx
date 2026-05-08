import { getSettingsNotification } from '@/server/actions/accounts'
import Notification from './_components/Notification'
import type { GetSettingsNotificationConfigResponse } from '../types'

export default async function NotificationsPage() {
    const data = await getSettingsNotification()
    return (
        <Notification
            initialData={data as GetSettingsNotificationConfigResponse}
        />
    )
}
