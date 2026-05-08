/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import { userDetailData } from '@/mock/data/usersData'
import {
    customerStatisticData,
    leadsData,
    leadNoteData,
    purchaseHistoryData,
    dealsData,
    subscriptionData,
    leadDocumentData,
    generateCrmDashboardData,
} from '@/mock/data/customerData'
import {
    helpdeskTicketData,
    helpdeskTicketDetailsData,
} from '@/mock/data/ticketsData'
import { customerActivityLog } from '@/mock/data/logData'
import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'

dayjs.extend(isBetween)

export async function getCustomerStatistics() {
    return customerStatisticData
}

export async function getCustomersList(params: any) {
    const {
        pageIndex = 1,
        pageSize = 10,
        sortOrder,
        sortKey,
        query,
        status,
        customerLabel,
        dateRange,
    } = params

    const users = userDetailData as any[]

    const sanitizeUsers = users.filter((elm) => typeof elm !== 'function')
    let data = sanitizeUsers
    let total = users.length

    if (status) {
        data = data.filter((item) => item.status === status)
        total = data.length
    }

    if (dateRange && dateRange.length > 0) {
        let dates = dateRange
        if (typeof dateRange === 'string') {
            dates = dateRange.split(',')
        }
        if (dates[0] && dates[1]) {
            data = data.filter((item) =>
                dayjs(item.lastOnline).isBetween(
                    dayjs(dates[0]),
                    dayjs(dates[1]),
                    'day',
                    '[]',
                ),
            )
            total = data.length
        }
    }

    let labels = customerLabel
    if (typeof customerLabel === 'string' && customerLabel.length > 0) {
        labels = customerLabel.split(',')
    }

    if (labels && labels.length > 0) {
        data = data.filter((item) =>
            labels.some((label: string) => item.tags.includes(label)),
        )
        total = data.length
    }

    if (sortKey && sortOrder) {
        if (sortKey !== 'totalSpending') {
            data.sort(
                sortBy(sortKey, sortOrder === 'desc', (a) =>
                    (a as string).toUpperCase(),
                ),
            )
        } else {
            data.sort(sortBy(sortKey, sortOrder === 'desc', parseInt as Primer))
        }
    }

    if (query) {
        data = wildCardSearch(data, query)
        total = data.length
    }

    data = paginate(data, Number(pageSize), Number(pageIndex))

    return {
        list: data,
        total: total,
    }
}

export async function getHelpdeskTickets(params?: any) {
    const {
        pageIndex = 1,
        pageSize = 10,
        sortOrder,
        sortKey,
        query,
        status,
        priority,
        category,
    } = params || {}

    const tickets = [...helpdeskTicketData] as any[]

    let data = tickets
    let total = tickets.length

    if (status && status.length > 0) {
        data = data.filter((item) => status.includes(item.status))
        total = data.length
    }

    if (priority && priority.length > 0) {
        data = data.filter((item) => priority.includes(item.priority))
        total = data.length
    }

    if (category && category.length > 0) {
        data = data.filter((item) => category.includes(item.category))
        total = data.length
    }

    if (sortKey && sortOrder) {
        if (sortKey !== 'totalSpending') {
            data.sort(
                sortBy(sortKey, sortOrder === 'desc', (a) =>
                    (a as string).toUpperCase(),
                ),
            )
        } else {
            data.sort(sortBy(sortKey, sortOrder === 'desc', parseInt as Primer))
        }
    }

    if (query) {
        data = wildCardSearch(data, query)
        total = data.length
    }

    data = paginate(data, Number(pageSize), Number(pageIndex))

    return {
        list: data,
        total: total,
    }
}

export async function getCustomerDetail(id: string) {
    const customer = userDetailData.find((user) => user.id === id)

    const user = {
        ...customer,
        ...leadsData.find((lead) => lead.id === id),
        notes: leadNoteData,
        purchases: purchaseHistoryData,
    }

    if (!customer) {
        return {
            ...userDetailData[0],
            ...leadsData[0],
            notes: leadNoteData,
            purchases: purchaseHistoryData,
        }
    }

    return user
}

export async function getCustomerLog(id: string) {
    console.log('getCustomerLog id:', id)
    return customerActivityLog
}

export async function getCustomerDeals(id: string) {
    console.log('getCustomerDeals id:', id)
    return {
        deals: dealsData,
        subscriptions: subscriptionData,
    }
}

export async function getCustomerDocuments(id: string) {
    console.log('getCustomerDocuments id:', id)
    return leadDocumentData
}

export async function getLeadsList(params: any) {
    const {
        pageIndex = 1,
        pageSize = 10,
        sortOrder,
        sortKey,
        query,
        leadStatus,
        probability,
        customerLabel,
    } = params

    const leads = userDetailData.map((user) => {
        const extra = leadsData.find((lead) => lead.id === user.id) || {}
        return {
            ...user,
            ...extra,
        }
    }) as any[]

    const sanitizeUsers = leads.filter((elm) => typeof elm !== 'function')
    let data = sanitizeUsers
    let total = leads.length

    if (leadStatus) {
        data = data.filter((item) => item.leadStatus === leadStatus)
    }

    if (probability) {
        const probabilityMap: Record<string, string[]> = {
            High: ['High', 'Medium', 'Low'],
            Medium: ['Medium', 'Low'],
            Low: ['Low'],
        }
        data = data.filter((item) => {
            const probabilityArr = probabilityMap[probability]
            if (probabilityArr) {
                return probabilityArr.includes(item.probability)
            }
            return true
        })
    }

    let labels = customerLabel
    if (typeof customerLabel === 'string' && customerLabel.length > 0) {
        labels = customerLabel.split(',')
    }

    if (labels && labels.length > 0) {
        data = data.filter((item) =>
            labels.some((label: string) => item.tags?.includes(label)),
        )
    }

    const executeSorting = () => {
        if (
            ['name', 'email', 'company', 'probability', 'phoneNumber'].includes(
                sortKey,
            )
        ) {
            data.sort(
                sortBy(sortKey, sortOrder === 'desc', (a) =>
                    (a as string).toUpperCase(),
                ),
            )
            return
        }

        if (sortKey === 'tags') {
            data.sort(
                sortBy(sortKey, sortOrder === 'desc', (a) => {
                    return (a as unknown as string[]).join(', ').toUpperCase()
                }),
            )
            return
        }

        data.sort(sortBy(sortKey, sortOrder === 'desc', parseInt as Primer))
    }

    if (sortKey && sortOrder) {
        executeSorting()
    }

    if (query) {
        data = wildCardSearch(data, query)
        total = data.length
    }

    data = paginate(data, Number(pageSize), Number(pageIndex))

    return {
        list: data,
        total: total,
    }
}
export async function getCrmDashboard(params?: {
    timeHorizon?: 'week' | 'month' | 'quarter'
    teamSelection?: string
}) {
    return generateCrmDashboardData(
        params?.timeHorizon || 'month',
        params?.teamSelection || 'all',
    )
}

export async function getHelpdeskTicket(id: string) {
    const basicData = helpdeskTicketData.find((ticket) => ticket.id === id)
    const detailsData = helpdeskTicketDetailsData.find(
        (ticket) => ticket.id === id,
    )

    if (!basicData) {
        return {
            ...helpdeskTicketData[0],
            ...helpdeskTicketDetailsData[0],
        }
    }

    return {
        ...basicData,
        ...detailsData,
    }
}
