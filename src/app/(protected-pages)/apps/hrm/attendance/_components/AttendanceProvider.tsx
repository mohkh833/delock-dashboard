'use client'

import { useEffect } from 'react'
import { useAttendanceStore } from '../_store/attendanceStore'
import type { GetAttendanceResponse } from '../types'
import type { ReactNode } from 'react'

type AttendanceProviderProps = {
    data: GetAttendanceResponse
    children: ReactNode
}

const AttendanceProvider = ({ data, children }: AttendanceProviderProps) => {
    const setData = useAttendanceStore((state) => state.setData)
    const setInitialLoading = useAttendanceStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setData(data)
        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data])

    return <>{children}</>
}

export default AttendanceProvider
