import { getHelpdeskTicket } from '@/server/actions/customers'
import HelpdeskWorkSpace from './_components/HelpdeskWorkSpace'
import type { TicketDetails } from '../types'

const HelpdeskTicketPage = async ({
    params,
}: {
    params: Promise<{ ticketId: string }>
}) => {
    const { ticketId } = await params
    const ticketData = await getHelpdeskTicket(ticketId)

    return <HelpdeskWorkSpace initialTicketData={ticketData as TicketDetails} />
}

export default HelpdeskTicketPage
