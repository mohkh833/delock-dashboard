import TicketList from './TicketList'
import HelpdeskTicketPanelHeader from './HelpdeskTicketPanelHeader'
import HelpdeskTicketPanelFooter from './HelpdeskTicketPanelFooter'
import Drawer from '@/components/ui/Drawer'
import { useHelpdeskStore } from '../_store/helpdeskStore'

const TicketPanelContent = () => {
    return (
        <>
            <HelpdeskTicketPanelHeader />
            <TicketList />
            <HelpdeskTicketPanelFooter className="p-4 border-t border-gray-200 dark:border-gray-800 rounded-b-lg" />
        </>
    )
}

const HelpdeskTicketPanel = () => {
    const ticketPanelDrawerOpen = useHelpdeskStore(
        (state) => state.ticketPanelDrawerOpen,
    )
    const setTicketPanelDrawerOpen = useHelpdeskStore(
        (state) => state.setTicketPanelDrawerOpen,
    )

    return (
        <>
            <div className="hidden xl:flex w-[280px] flex-auto flex-col justify-between absolute top-px bottom-0 ease-in-out duration-300 ltr:border-r rtl:border-l border-gray-200 dark:border-gray-800 rtl:rounded-br-lg ltr:rounded-bl-lg z-10">
                <TicketPanelContent />
            </div>
            <Drawer
                title="Tickets"
                isOpen={ticketPanelDrawerOpen}
                placement="left"
                width={300}
                onClose={() => setTicketPanelDrawerOpen(false)}
                bodyClass="p-0 flex flex-col"
            >
                <TicketPanelContent />
            </Drawer>
        </>
    )
}

export default HelpdeskTicketPanel
