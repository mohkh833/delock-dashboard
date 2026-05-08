import { getActivityLogs } from '@/server/actions/accounts'
import ActivityLog from './_components/ActivityLog'
import type { GetActivityLogResponse } from './types'

export default async function ActivityPage() {
    const data = await getActivityLogs(1)
    return <ActivityLog initialData={data as GetActivityLogResponse} />
}
