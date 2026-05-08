'use client'

import { createContext, useContext, useState } from 'react'
import type { Announcement, Category, AnnouncementsInitialData } from '../types'

type AnnouncementsDataContextType = {
    announcements: Announcement[]
    categories: Category[]
    pinnedAnnouncements: Announcement[]
    updateAnnouncements: (
        updater: (announcements: Announcement[]) => Announcement[],
    ) => void
    createAnnouncement: (announcement: Announcement) => void
}

const AnnouncementsDataContext =
    createContext<AnnouncementsDataContextType | null>(null)

type AnnouncementsDataProviderProps = {
    initialData: AnnouncementsInitialData
    children: React.ReactNode
}

export const AnnouncementsDataProvider = ({
    initialData,
    children,
}: AnnouncementsDataProviderProps) => {
    const [announcements, setAnnouncements] = useState<Announcement[]>(
        initialData.announcements as Announcement[],
    )
    const [categories] = useState<Category[]>(
        initialData.categories as Category[],
    )
    const [pinnedAnnouncements, setPinnedAnnouncements] = useState<
        Announcement[]
    >(initialData.pinnedAnnouncements as Announcement[])

    const updateAnnouncements = (
        updater: (announcements: Announcement[]) => Announcement[],
    ) => {
        setAnnouncements((prev) => {
            const updated = updater(prev)
            // Keep pinned list in sync
            setPinnedAnnouncements(
                updated.filter((a) => a.isPinned).slice(0, 5),
            )
            return updated
        })
    }

    const createAnnouncement = (announcement: Announcement) => {
        setAnnouncements((prev) => [announcement, ...prev])
    }

    return (
        <AnnouncementsDataContext.Provider
            value={{
                announcements,
                categories,
                pinnedAnnouncements,
                updateAnnouncements,
                createAnnouncement,
            }}
        >
            {children}
        </AnnouncementsDataContext.Provider>
    )
}

export const useAnnouncementsData = () => {
    const context = useContext(AnnouncementsDataContext)
    if (!context) {
        throw new Error(
            'useAnnouncementsData must be used within AnnouncementsDataProvider',
        )
    }
    return context
}
