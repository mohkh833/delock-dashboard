'use client'

import { useEffect } from 'react'
import HelpdeskTicketPanel from './HelpdeskTicketPanel'
import { useHelpdeskStore } from '../_store/helpdeskStore'
import type { ReactNode } from 'react'
import type { Ticket } from '../types'

type HelpdeskLayoutClientProps = {
    children: ReactNode
    initialTicketData: {
        list: Ticket[]
        total: number
    }
}

const HelpdeskLayoutClient = ({
    children,
    initialTicketData,
}: HelpdeskLayoutClientProps) => {
    const setTicketList = useHelpdeskStore((state) => state.setTicketList)

    useEffect(() => {
        setTicketList(initialTicketData.list, initialTicketData.total)
    }, [initialTicketData, setTicketList])

    return (
        <>
            <HelpdeskTicketPanel />
            {children}
        </>
    )
}

export default HelpdeskLayoutClient
