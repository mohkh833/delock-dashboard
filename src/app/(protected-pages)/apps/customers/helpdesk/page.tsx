'use client'
import Button from '@/components/ui/Button'
import EmptyState from '@/components/shared/EmptyState'
import IconFrame from '@/components/shared/IconFrame'
import { useHelpdeskStore } from './_store/helpdeskStore'
import { LuMousePointerClick, LuAlignLeft } from 'react-icons/lu'

const HelpdeskPage = () => {
    const setTicketPanelDrawerOpen = useHelpdeskStore(
        (state) => state.setTicketPanelDrawerOpen,
    )

    return (
        <div className="flex flex-auto w-full min-w-0 overflow-hidden xl:ltr:ml-[280px] xl:rtl:mr-[280px]">
            <div className="flex-1 flex flex-col items-center justify-center -mt-20">
                <div className="absolute top-4 left-4 block lg:hidden">
                    <Button
                        icon={<LuAlignLeft />}
                        size="sm"
                        onClick={() => setTicketPanelDrawerOpen(true)}
                    />
                </div>
                <EmptyState
                    size={340}
                    offset={-80}
                    illustration={
                        <IconFrame
                            variant="thick"
                            className="bg-white dark:bg-gray-700"
                            size={50}
                        >
                            <LuMousePointerClick className="text-2xl heading-text" />
                        </IconFrame>
                    }
                >
                    <div className="text-center space-y-4">
                        <h3>No Ticket Selected</h3>
                        <p className="max-w-[400px]">
                            Select a ticket from the list to view its details
                            and start assisting your customer.
                        </p>
                    </div>
                </EmptyState>
            </div>
        </div>
    )
}

export default HelpdeskPage
