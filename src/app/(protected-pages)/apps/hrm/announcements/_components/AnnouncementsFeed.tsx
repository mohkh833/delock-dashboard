'use client'

import { useMemo } from 'react'
import dayjs from 'dayjs'
import CreateAnnouncementBox from './CreateAnnouncementBox'
import AnnouncementCard from './AnnouncementCard'
import { useAnnouncementsStore } from '../_store/announcementsStore'
import { useAnnouncementsData } from '../_context/AnnouncementsDataContext'
import type { Announcement } from '../types'

const AnnouncementsFeed = () => {
    const { announcements } = useAnnouncementsData()
    const selectedCategory = useAnnouncementsStore(
        (state) => state.selectedCategory,
    )
    const dateRange = useAnnouncementsStore((state) => state.dateRange)
    const sortBy = useAnnouncementsStore((state) => state.sortBy)

    const filteredAnnouncements = useMemo<Announcement[]>(() => {
        let result = [...announcements]

        if (selectedCategory !== 'all') {
            result = result.filter((a) => a.category === selectedCategory)
        }

        if (dateRange) {
            result = result.filter((a) => {
                const date = dayjs(a.createdAt)
                return (
                    date.isAfter(dayjs(dateRange.start)) &&
                    date.isBefore(dayjs(dateRange.end))
                )
            })
        }

        result.sort((a, b) => {
            if (sortBy === 'date-desc')
                return (
                    dayjs(b.createdAt).valueOf() - dayjs(a.createdAt).valueOf()
                )
            if (sortBy === 'date-asc')
                return (
                    dayjs(a.createdAt).valueOf() - dayjs(b.createdAt).valueOf()
                )
            if (sortBy === 'reactions')
                return (
                    b.reactions.reduce((s, r) => s + r.count, 0) -
                    a.reactions.reduce((s, r) => s + r.count, 0)
                )
            if (sortBy === 'comments')
                return b.comments.length - a.comments.length
            return 0
        })

        return result
    }, [announcements, selectedCategory, dateRange, sortBy])

    return (
        <div className="space-y-4 w-full">
            <CreateAnnouncementBox />

            {filteredAnnouncements.length > 0 ? (
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                    {filteredAnnouncements.map((announcement) => (
                        <AnnouncementCard
                            key={announcement.id}
                            announcement={announcement}
                        />
                    ))}
                </div>
            ) : (
                <div className="text-center py-16">
                    <div className="mb-4">
                        <svg
                            className="mx-auto h-16 w-16 opacity-20"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={1.5}
                                d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                            />
                        </svg>
                    </div>
                    <h3 className="font-semibold mb-2">
                        No announcements found
                    </h3>
                    <p className="opacity-60 mb-4">
                        Try adjusting your filters or create a new announcement
                        to get started
                    </p>
                </div>
            )}
        </div>
    )
}

export default AnnouncementsFeed
