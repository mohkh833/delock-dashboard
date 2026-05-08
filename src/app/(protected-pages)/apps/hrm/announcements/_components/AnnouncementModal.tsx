'use client'

import { useEffect, useRef } from 'react'
import Dialog from '@/components/ui/Dialog'
import Scroll from '@/components/ui/Scroll'
import { useAnnouncementsStore } from '../_store/announcementsStore'
import { useAnnouncementsData } from '../_context/AnnouncementsDataContext'
import AnnouncementCard from './AnnouncementCard'

const AnnouncementModal = () => {
    const { modals, closeAllModals, toggleComments, expandedComments } =
        useAnnouncementsStore()

    const { announcements } = useAnnouncementsData()

    const isOpen = modals.viewAnnouncement.isOpen
    const announcementId = modals.viewAnnouncement.announcementId

    const announcement = announcements.find((a) => a.id === announcementId)

    const scrollRef = useRef<HTMLDivElement>(null)

    const handleScrollBottom = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight
        }
    }

    useEffect(() => {
        if (isOpen && announcementId && !expandedComments.has(announcementId)) {
            toggleComments(announcementId)
        }
    }, [isOpen, announcementId, expandedComments, toggleComments])

    return (
        <Dialog
            isOpen={isOpen}
            onClose={closeAllModals}
            width={800}
            closable={false}
            className="pb-4 px-1"
        >
            {announcement && (
                <Scroll.FlexSize ref={scrollRef} className="max-h-[80vh] px-3">
                    <AnnouncementCard
                        isDialogView
                        announcement={announcement}
                        onClose={closeAllModals}
                        onScrollBottom={handleScrollBottom}
                    />
                </Scroll.FlexSize>
            )}
        </Dialog>
    )
}

export default AnnouncementModal
