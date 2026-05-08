'use client'

import {
    LiHash,
    LiStatus,
    LiUserAdd,
    LiCake,
    LiStatusUp,
    LiRepeat,
    LiStar,
    LiArchiveBook,
    LiStory,
} from '@/icons'
import { useAnnouncementsStore } from '../_store/announcementsStore'
import { useAnnouncementsData } from '../_context/AnnouncementsDataContext'
import classNames from '@/utils/classNames'

const getCategoryIcon = (category: string) => {
    switch (category) {
        case 'all':
            return <LiHash />
        case 'general':
            return <LiStatus />
        case 'new-hire':
            return <LiUserAdd />
        case 'policy':
            return <LiArchiveBook />
        case 'promotion':
            return <LiStar />
        case 'transfer':
            return <LiRepeat />
        case 'training':
            return <LiStatusUp />
        case 'special':
            return <LiCake />
        default:
            return <LiStory />
    }
}

const AnnouncementsSidebar = () => {
    const { categories } = useAnnouncementsData()
    const selectedCategory = useAnnouncementsStore(
        (state) => state.selectedCategory,
    )
    const setSelectedCategory = useAnnouncementsStore(
        (state) => state.setSelectedCategory,
    )

    return (
        <div className="w-full lg:max-w-64">
            <nav aria-label="Announcement categories">
                <div className="space-y-1" role="list">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            role="listitem"
                            aria-current={
                                selectedCategory === category.id
                                    ? 'page'
                                    : undefined
                            }
                            aria-label={`${category.name} category, ${category.count} announcements`}
                            className={classNames(
                                'w-full flex items-center gap-2 p-2 rounded-lg transition-colors',
                                selectedCategory === category.id
                                    ? 'bg-gray-100 dark:bg-gray-700 font-medium'
                                    : 'hover:bg-gray-100 dark:hover:bg-gray-700',
                            )}
                        >
                            <span className="text-lg">
                                {getCategoryIcon(category.id)}
                            </span>
                            <span className="heading-text">
                                {category.name}
                            </span>
                        </button>
                    ))}
                </div>
            </nav>
        </div>
    )
}

export default AnnouncementsSidebar
