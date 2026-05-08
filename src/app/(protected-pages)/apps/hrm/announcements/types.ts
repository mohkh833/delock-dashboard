export type Category = {
    id: string
    name: string
    color: string
    count: number
    icon?: string
}

export type MediaType = 'photo' | 'video'

export type Media = {
    id: string
    type: MediaType
    url: string
    thumbnail?: string
    name: string
    size: number
}

export type Reaction = {
    emoji: string
    count: number
    users: {
        id: string
        name: string
    }[]
    reacted?: boolean
}

export type CommentReply = {
    id: string
    author: {
        id: string
        name: string
        avatar?: string
    }
    text: string
    createdAt: string
}

export type Comment = {
    id: string
    author: {
        id: string
        name: string
        avatar?: string
    }
    text: string
    createdAt: string
    replies?: CommentReply[]
    reactions?: Reaction[]
}

export type Announcement = {
    id: string
    author: {
        id: string
        name: string
        title: string
        avatar?: string
    }
    category: string
    title: string
    description: string
    media?: Media[]
    reactions: Reaction[]
    comments: Comment[]
    isPinned: boolean
    createdAt: string
    updatedAt: string
}

export type DateRange = {
    start: string
    end: string
}

export type SortOption = 'date-desc' | 'date-asc' | 'reactions' | 'comments'

export type ModalState = {
    viewAnnouncement: {
        isOpen: boolean
        announcementId: string | null
    }
}

export type AnnouncementsStoreState = {
    selectedCategory: string
    dateRange: DateRange | null
    sortBy: SortOption
    modals: ModalState
    expandedComments: Set<string>
}

export type AnnouncementsStoreActions = {
    setSelectedCategory: (category: string) => void
    setDateRange: (range: DateRange | null) => void
    setSortBy: (sort: SortOption) => void
    openViewModal: (announcementId: string) => void
    closeAllModals: () => void
    toggleComments: (announcementId: string) => void
}

export type AnnouncementsInitialData = {
    announcements: Announcement[]
    categories: Category[]
    pinnedAnnouncements: Announcement[]
}
