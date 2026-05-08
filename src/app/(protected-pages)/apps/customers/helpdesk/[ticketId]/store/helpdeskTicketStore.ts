import { create } from 'zustand'
import type { TicketDetails } from '../../types'

export type HelpdeskTicketState = {
    ticketDetails: TicketDetails | null
    initialLoading: boolean
}

type HelpdeskTicketAction = {
    setTicketDetails: (details: TicketDetails) => void
}

const initialState: HelpdeskTicketState = {
    ticketDetails: null,
    initialLoading: true,
}

export const useHelpdeskTicketStore = create<
    HelpdeskTicketState & HelpdeskTicketAction
>((set) => ({
    ...initialState,
    setTicketDetails: (details) =>
        set(() => ({ ticketDetails: details, initialLoading: false })),
}))
