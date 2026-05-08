import { getTimeline } from '@/server/actions/projects'
import TimelineProvider from './_components/TimelineProvider'
import type { GetProjectTimelineResponse } from './types'

export default async function TimelinePage() {
    const data = await getTimeline()
    return (
        <TimelineProvider
            initialData={data as unknown as GetProjectTimelineResponse}
        />
    )
}
