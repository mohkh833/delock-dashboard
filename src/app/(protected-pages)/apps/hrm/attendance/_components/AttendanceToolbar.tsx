'use client'

import { useRef, useEffect, useState } from 'react'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import Select from '@/components/ui/Select'
import Segment from '@/components/ui/Segment'
import DebouceInput from '@/components/shared/DebouceInput'
import { LiAdd, LiTextAlignLeft, LiElement3 } from '@/icons'
import { LuSearch } from 'react-icons/lu'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useAttendanceStore } from '../_store/attendanceStore'
import { getAttendanceStatusOptions } from '../utils'
import type { ViewMode } from '../types'

type AttendanceToolbarProps = {
    onAddRecord: () => void
}

const AttendanceToolbar = ({ onAddRecord }: AttendanceToolbarProps) => {
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()
    const viewMode = useAttendanceStore((state) => state.viewMode)
    const setViewMode = useAttendanceStore((state) => state.setViewMode)
    const searchInputRef = useRef<HTMLInputElement>(null)

    const selectedDate =
        searchParams.get('date') || dayjs().format('YYYY-MM-DD')
    const currentStatus = searchParams.get('status') || 'all'

    const [dateRange, setDateRange] = useState({ startDate: '', endDate: '' })

    useEffect(() => {
        const date = dayjs(selectedDate)
        setDateRange({
            startDate: date.startOf('week').format('YYYY-MM-DD'),
            endDate: date.endOf('week').format('YYYY-MM-DD'),
        })
    }, [selectedDate])

    const viewOptions = [
        { value: 'list', label: <LiTextAlignLeft /> },
        { value: 'period', label: <LiElement3 /> },
    ]

    const statusOptions = getAttendanceStatusOptions()

    const handleViewChange = (value: string) => {
        setViewMode(value as ViewMode)
        appendQueryParams({ query: null, status: null, pageIndex: 1 })
        if (searchInputRef.current) {
            searchInputRef.current.value = ''
        }
    }

    const handleSearch = (query: string) => {
        appendQueryParams({ query: query || null, pageIndex: 1 })
    }

    const handleStatusFilter = (
        option: { value: string; label: string } | null,
    ) => {
        appendQueryParams({
            status: option?.value === 'all' ? null : option?.value || null,
            pageIndex: 1,
        })
    }

    const selectedStatus = statusOptions.find(
        (o) => o.value === (currentStatus || 'all'),
    )

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center lg:flex-1">
                    <div className="w-full sm:w-auto">
                        <DebouceInput
                            ref={searchInputRef}
                            className="lg:max-w-[250px]"
                            prefix={
                                <LuSearch className="text-base heading-text" />
                            }
                            placeholder="Search by name, department..."
                            wait={300}
                            defaultValue={searchParams.get('query') || ''}
                            onChange={(
                                e: React.ChangeEvent<HTMLInputElement>,
                            ) => handleSearch(e.target.value)}
                        />
                    </div>
                    {viewMode === 'list' && (
                        <div className="w-full sm:min-w-[150px] sm:w-auto">
                            <Select
                                options={statusOptions}
                                value={selectedStatus}
                                onChange={handleStatusFilter}
                                placeholder="Filter by status"
                            />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    {viewMode === 'period' && (
                        <div className="font-medium heading-text text-center sm:text-left">
                            {dateRange.startDate &&
                                dateRange.endDate &&
                                `${dayjs(dateRange.startDate).format('MMM D')} - ${dayjs(dateRange.endDate).format('MMM D, YYYY')}`}
                        </div>
                    )}
                    <div className="flex items-center gap-2 justify-between sm:justify-end">
                        <Segment value={viewMode} onChange={handleViewChange}>
                            {viewOptions.map((option) => (
                                <Segment.Item
                                    key={option.value}
                                    value={option.value}
                                    className="px-2"
                                >
                                    {option.label}
                                </Segment.Item>
                            ))}
                        </Segment>
                        <Button icon={<LiAdd />} onClick={onAddRecord}>
                            Add Record
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AttendanceToolbar
