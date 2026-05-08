'use client'

import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import DatePicker from '@/components/ui/DatePicker'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const AttendanceHeader = () => {
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const selectedDate =
        searchParams.get('date') || dayjs().format('YYYY-MM-DD')

    const handleDateChange = (date: Date | null) => {
        if (date) {
            appendQueryParams({
                date: dayjs(date).format('YYYY-MM-DD'),
                pageIndex: 1,
            })
        }
    }

    return (
        <div className="flex flex-col gap-4 mb-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
                <h4>Attendance</h4>
                <p>Track and manage employee attendance records</p>
            </div>
            <div className="flex items-center gap-3">
                <DatePicker
                    value={new Date(selectedDate)}
                    onChange={handleDateChange}
                    placeholder="Select date"
                    inputFormat="DD MMM YYYY"
                    clearable={false}
                />
            </div>
        </div>
    )
}

export default AttendanceHeader
