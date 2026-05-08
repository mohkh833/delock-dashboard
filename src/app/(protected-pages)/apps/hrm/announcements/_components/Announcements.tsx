'use client'

import Container from '@/components/shared/Container'
import AnnouncementsSidebar from './AnnouncementsSidebar'
import AnnouncementsFeed from './AnnouncementsFeed'
import PinnedSidebar from './PinnedSidebar'
import AnnouncementModal from './AnnouncementModal'
import AnnouncementHeader from './AnnouncementHeader'
import { AnnouncementsDataProvider } from '../_context/AnnouncementsDataContext'
import type { AnnouncementsInitialData } from '../types'

type AnnouncementsProps = {
    initialData: AnnouncementsInitialData
}

const Announcements = ({ initialData }: AnnouncementsProps) => {
    return (
        <AnnouncementsDataProvider initialData={initialData}>
            <Container>
                <AnnouncementHeader />
                <div className="flex flex-col lg:flex-row gap-8">
                    <div className="hidden lg:block lg:min-w-[160px] 2xl:min-w-[260px]">
                        <AnnouncementsSidebar />
                    </div>
                    <AnnouncementsFeed />
                    <div className="lg:min-w-[220px] 2xl:min-w-[360px] max-w-[360px]">
                        <PinnedSidebar />
                    </div>
                </div>
            </Container>
            <AnnouncementModal />
        </AnnouncementsDataProvider>
    )
}

export default Announcements
