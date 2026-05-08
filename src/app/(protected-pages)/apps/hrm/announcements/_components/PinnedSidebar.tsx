'use client'

import PinnedAnnouncementCard from './PinnedAnnouncementCard'
import { useAnnouncementsData } from '../_context/AnnouncementsDataContext'

const PinnedSidebar = () => {
    const { pinnedAnnouncements } = useAnnouncementsData()

    return (
        <div className="divide-y divide-gray-200 dark:divide-gray-800">
            {pinnedAnnouncements.map((announcement) => (
                <PinnedAnnouncementCard
                    key={announcement.id}
                    announcement={announcement}
                />
            ))}
        </div>
    )
}

export default PinnedSidebar
