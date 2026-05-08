import { useEffect, useState, startTransition } from 'react'
import {
    useHelpdeskStore,
    initialTableData,
    initialFilterData,
} from '../_store/helpdeskStore'
import { apiGetHelpdeskTickets } from '@/services/client/CustomersService'
import useSWR from 'swr'
import type { GetHelpdeskTicketsResponse } from '../types'
import type { TableQueries } from '@/@types/common'

const useTicketList = () => {
    const pagingState = useHelpdeskStore((state) => state.pagingState)
    const filterData = useHelpdeskStore((state) => state.filterData)
    const ticketList = useHelpdeskStore((state) => state.ticketList)
    const ticketListTotal = useHelpdeskStore((state) => state.ticketListTotal)
    const initialLoading = useHelpdeskStore((state) => state.initialLoading)
    const setTicketList = useHelpdeskStore((state) => state.setTicketList)

    const [everInteracted, setEverInteracted] = useState(false)

    const isInitialState =
        pagingState.pageIndex === initialTableData.pageIndex &&
        pagingState.pageSize === initialTableData.pageSize &&
        pagingState.query === initialTableData.query &&
        filterData.status.length === initialFilterData.status.length &&
        filterData.priority.length === initialFilterData.priority.length &&
        filterData.category.length === initialFilterData.category.length &&
        filterData.query === initialFilterData.query

    useEffect(() => {
        if (!isInitialState) {
            startTransition(() => setEverInteracted(true))
        }
    }, [isInitialState])

    const {
        data: helpdeskTicketsData,
        error,
        isLoading,
        mutate,
    } = useSWR(
        everInteracted
            ? ['/api/helpdesk/tickets', { ...pagingState, ...filterData }]
            : null,
        ([, params]) =>
            apiGetHelpdeskTickets<GetHelpdeskTicketsResponse, TableQueries>(
                params,
            ),
        {
            revalidateOnFocus: false,
        },
    )

    useEffect(() => {
        if (helpdeskTicketsData) {
            setTicketList(helpdeskTicketsData.list, helpdeskTicketsData.total)
        }
    }, [helpdeskTicketsData, setTicketList])

    return {
        ticketList,
        ticketListTotal,
        error,
        isLoading: initialLoading || isLoading,
        mutate,
    }
}

export default useTicketList
