'use client'
import { useEffect, startTransition } from 'react'
import TicketInfo from './TicketInfo'
import TicketMessages from './TicketMessages'
import Drawer from '@/components/ui/Drawer'
import useTicketDetails from '../hooks/useTicketDetails'
import { useHelpdeskStore } from '../../_store/helpdeskStore'
import { useHelpdeskTicketStore } from '../store/helpdeskTicketStore'
import dayjs from 'dayjs'
import uniqueId from 'lodash/uniqueId'
import type { TicketDetails, EditableTicketDetails } from '../../types'

type HelpdeskWorkSpaceProps = {
    initialTicketData: TicketDetails
}

const HelpdeskWorkSpace = ({ initialTicketData }: HelpdeskWorkSpaceProps) => {
    const setTicketDetails = useHelpdeskTicketStore(
        (state) => state.setTicketDetails,
    )

    useEffect(() => {
        startTransition(() => setTicketDetails(initialTicketData))
    }, [initialTicketData, setTicketDetails])

    const { ticketDetails, isLoading } = useTicketDetails()

    const ticketInfoDrawerOpen = useHelpdeskStore(
        (state) => state.ticketInfoDrawerOpen,
    )
    const setTicketInfoDrawerOpen = useHelpdeskStore(
        (state) => state.setTicketInfoDrawerOpen,
    )
    const setTicketPanelDrawerOpen = useHelpdeskStore(
        (state) => state.setTicketPanelDrawerOpen,
    )

    const ticketList = useHelpdeskStore((state) => state.ticketList)
    const ticketListTotal = useHelpdeskStore((state) => state.ticketListTotal)
    const setTicketList = useHelpdeskStore((state) => state.setTicketList)

    const handleMessageSubmit = ({
        message,
        type,
    }: {
        message: string
        type: string
    }) => {
        if (ticketDetails) {
            setTicketDetails({
                ...ticketDetails,
                messages: [
                    ...ticketDetails.messages,
                    {
                        id: uniqueId('message-'),
                        user: {
                            id: '1',
                            name: 'Angelina Gotelli',
                            img: '/img/avatars/thumb-1.jpg',
                        },
                        type: type as 'private' | 'public',
                        createdDate: dayjs().toISOString(),
                        content: message,
                        attachments: [],
                        sender: 'support',
                    },
                ],
            })
        }
    }

    const handleInfoUpdate = (payload: EditableTicketDetails) => {
        if (ticketDetails) {
            setTicketDetails({ ...ticketDetails, ...payload })
        }
        if (ticketList) {
            setTicketList(
                ticketList.map((ticket) => {
                    if (ticket.id === ticketDetails?.id) {
                        return { ...ticket, ...payload }
                    }
                    return ticket
                }),
                ticketListTotal,
            )
        }
    }

    const handleRemoveLinkedTicket = (id: string) => {
        if (ticketDetails) {
            setTicketDetails({
                ...ticketDetails,
                linkedTickes: ticketDetails.linkedTickes.filter(
                    (ticket) => ticket.id !== id,
                ),
            })
        }
    }

    const handlePinClick = (pinned: boolean) => {
        if (ticketDetails) {
            setTicketDetails({ ...ticketDetails, pinned })
        }
        if (ticketList) {
            setTicketList(
                ticketList.map((ticket) => {
                    if (ticket.id === ticketDetails?.id) {
                        return { ...ticket, pinned }
                    }
                    return ticket
                }),
                ticketListTotal,
            )
        }
    }

    const renderTicketInfo = () => {
        if (!ticketDetails || isLoading) return null

        return (
            <div className="w-70 relative ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 ltr:rounded-br-lg rtl:rounded-bl-lg z-10">
                <TicketInfo
                    data={ticketDetails}
                    onUpdate={handleInfoUpdate}
                    onRemoveLinkedTicket={handleRemoveLinkedTicket}
                />
                <Drawer
                    title="Ticket Info"
                    isOpen={ticketInfoDrawerOpen}
                    placement="right"
                    width={300}
                    onClose={() => setTicketInfoDrawerOpen(false)}
                    bodyClass="p-0"
                >
                    <TicketInfo
                        data={ticketDetails}
                        onUpdate={handleInfoUpdate}
                        onRemoveLinkedTicket={handleRemoveLinkedTicket}
                    />
                </Drawer>
            </div>
        )
    }

    return (
        <div className="flex flex-auto w-full min-w-0 overflow-hidden xl:ltr:ml-70 xl:rtl:mr-70">
            <TicketMessages
                data={ticketDetails ?? undefined}
                isLoading={isLoading}
                onMessageSubmit={handleMessageSubmit}
                onPinClick={handlePinClick}
                onTicketPanelOpen={() => setTicketPanelDrawerOpen(true)}
                onTicketInfoOpen={() => setTicketInfoDrawerOpen(true)}
            />
            {renderTicketInfo()}
        </div>
    )
}

export default HelpdeskWorkSpace
