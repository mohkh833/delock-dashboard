import { useHelpdeskTicketStore } from '../store/helpdeskTicketStore'

const useTicketDetails = () => {
    const ticketDetails = useHelpdeskTicketStore((state) => state.ticketDetails)
    const initialLoading = useHelpdeskTicketStore(
        (state) => state.initialLoading,
    )
    const setTicketDetails = useHelpdeskTicketStore(
        (state) => state.setTicketDetails,
    )

    return {
        ticketDetails,
        isLoading: initialLoading,
        setTicketDetails,
    }
}

export default useTicketDetails
