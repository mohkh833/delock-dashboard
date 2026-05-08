'use client'

import { useAttendanceStore } from '../_store/attendanceStore'

const useAttendanceData = () => {
    const data = useAttendanceStore((state) => state.data)
    const initialLoading = useAttendanceStore((state) => state.initialLoading)

    return { data, initialLoading }
}

export default useAttendanceData
