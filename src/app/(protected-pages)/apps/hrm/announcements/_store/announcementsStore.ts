import { create } from 'zustand'
import sleep from '@/utils/sleep'
import type {
    AnnouncementsStoreState,
    AnnouncementsStoreActions,
    DateRange,
    SortOption,
} from '../types'

type AnnouncementsStore = AnnouncementsStoreState & AnnouncementsStoreActions

const initialState: AnnouncementsStoreState = {
    selectedCategory: 'all',
    dateRange: null,
    sortBy: 'date-desc',
    modals: {
        viewAnnouncement: {
            isOpen: false,
            announcementId: null,
        },
    },
    expandedComments: new Set<string>(),
}

export const useAnnouncementsStore = create<AnnouncementsStore>()((set) => ({
    ...initialState,

    setSelectedCategory: (category: string) =>
        set({ selectedCategory: category }),

    setDateRange: (range: DateRange | null) => set({ dateRange: range }),

    setSortBy: (sort: SortOption) => set({ sortBy: sort }),

    openViewModal: (announcementId: string) =>
        set((state) => ({
            modals: {
                ...state.modals,
                viewAnnouncement: {
                    isOpen: true,
                    announcementId,
                },
            },
        })),

    closeAllModals: async () => {
        set((state) => ({
            modals: {
                viewAnnouncement: {
                    isOpen: false,
                    announcementId:
                        state.modals.viewAnnouncement.announcementId,
                },
            },
        }))
        await sleep(300)
        set((state) => ({
            modals: {
                ...state.modals,
                viewAnnouncement: {
                    ...state.modals.viewAnnouncement,
                    announcementId: null,
                },
            },
        }))
    },

    toggleComments: (announcementId: string) =>
        set((state) => {
            const newExpanded = new Set(state.expandedComments)
            if (newExpanded.has(announcementId)) {
                newExpanded.delete(announcementId)
            } else {
                newExpanded.add(announcementId)
            }
            return { expandedComments: newExpanded }
        }),
}))
