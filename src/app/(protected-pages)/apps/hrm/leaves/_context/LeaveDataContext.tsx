'use client'

import { createContext, useContext, useState } from 'react'
import dayjs from 'dayjs'
import { getLeaveTypeColor } from '@/mock/data/hrmData'
import sleep from '@/utils/sleep'
import type { ReactNode } from 'react'
import type { FullCalendarEvent } from '@/components/shared/FullCalendar'
import type {
    LeaveCalendarEvent,
    LeaveStatistics,
    EmployeeLeaveDetail,
    LeaveRequest,
    LeaveInitialData,
} from '../types'

type LeaveDataContextType = {
    calendarEvents: LeaveCalendarEvent[]
    calendarLoading: boolean
    statistics: LeaveStatistics | null
    statisticsLoading: boolean
    leaveRequests: LeaveRequest[]
    employeeLeaveDetails: Record<string, EmployeeLeaveDetail>
    createLeaveRequest: (data: Record<string, unknown>) => Promise<void>
    createHoliday: (data: Record<string, unknown>) => Promise<void>
    getEmployeeLeaveDetail: (
        employeeId: string,
        eventId: string,
    ) => Promise<EmployeeLeaveDetail | null>
    updateEvent: (event: FullCalendarEvent) => void
    updateLeaveRequestStatus: (
        id: string,
        status: 'approved' | 'rejected',
    ) => void
}

const LeaveDataContext = createContext<LeaveDataContextType | null>(null)

type LeaveDataProviderProps = {
    children: ReactNode
    initialData: LeaveInitialData
}

export const LeaveDataProvider = ({
    children,
    initialData,
}: LeaveDataProviderProps) => {
    const [calendarEvents, setCalendarEvents] = useState<LeaveCalendarEvent[]>(
        initialData.calendarEvents,
    )
    const [statistics] = useState<LeaveStatistics>(initialData.statistics)
    const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>(
        initialData.leaveRequests,
    )
    const [employeeLeaveDetails, setEmployeeLeaveDetails] = useState<
        Record<string, EmployeeLeaveDetail>
    >(initialData.employeeLeaveDetails)

    const updateEvent = (event: FullCalendarEvent) => {
        setCalendarEvents(
            (prev) =>
                prev.map(
                    (calendarEvent) =>
                        calendarEvent.id === event.id
                            ? { ...event, employees: calendarEvent.employees }
                            : calendarEvent,
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                ) as any,
        )
    }

    const createLeaveRequest = async (data: Record<string, unknown>) => {
        await sleep(500)
        console.log('createLeaveRequest', data)
    }

    const createHoliday = async (data: Record<string, unknown>) => {
        await sleep(500)

        const newHoliday: LeaveCalendarEvent = {
            id: dayjs().valueOf(),
            startDate: data.startDate as string,
            endDate: (data.endDate as string) || (data.startDate as string),
            title: (data.title as string) || 'Public Holiday',
            color: getLeaveTypeColor('publicHoliday'),
            description:
                (data.description as string) ||
                `Public Holiday - ${data.title}`,
            type: 'holiday',
            employees: [],
        }

        setCalendarEvents((prev) => [...prev, newHoliday])
    }

    const getEmployeeLeaveDetail = async (
        employeeId: string,
        eventId: string,
    ): Promise<EmployeeLeaveDetail | null> => {
        const key = `${employeeId}-${eventId}`
        return employeeLeaveDetails[key] || null
    }

    const updateLeaveRequestStatus = (
        id: string,
        status: 'approved' | 'rejected',
    ) => {
        setLeaveRequests((prev) =>
            prev.map((req) => (req.id === id ? { ...req, status } : req)),
        )
        // Also update in employeeLeaveDetails
        setEmployeeLeaveDetails((prev) => {
            const updated = { ...prev }
            Object.keys(updated).forEach((key) => {
                if (updated[key].id === id) {
                    updated[key] = {
                        ...updated[key],
                        status:
                            status === 'approved'
                                ? 'Approved'
                                : ('Rejected' as const),
                    }
                }
            })
            return updated
        })
    }

    return (
        <LeaveDataContext.Provider
            value={{
                calendarEvents,
                calendarLoading: false,
                statistics,
                statisticsLoading: false,
                leaveRequests,
                employeeLeaveDetails,
                createLeaveRequest,
                createHoliday,
                getEmployeeLeaveDetail,
                updateEvent,
                updateLeaveRequestStatus,
            }}
        >
            {children}
        </LeaveDataContext.Provider>
    )
}

export const useLeaveData = () => {
    const context = useContext(LeaveDataContext)
    if (!context) {
        throw new Error('useLeaveData must be used within LeaveDataProvider')
    }
    return context
}

export default LeaveDataContext
