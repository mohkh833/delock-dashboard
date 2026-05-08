'use client'

import { useCallback } from 'react'
import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import AttendanceProvider from './AttendanceProvider'
import AttendanceHeader from './AttendanceHeader'
import AttendanceMetrics from './AttendanceMetrics'
import AttendanceToolbar from './AttendanceToolbar'
import AttendanceView from './AttendanceView'
import MarkAttendanceDialog from './MarkAttendanceDialog'
import { useAttendanceStore } from '../_store/attendanceStore'
import type { GetAttendanceResponse } from '../types'
import type { AttendanceRecord } from '../types'

type AttendanceProps = {
    data: GetAttendanceResponse
}

const AttendanceContent = () => {
    const setSelectedRecord = useAttendanceStore(
        (state) => state.setSelectedRecord,
    )
    const setMarkAttendanceOpen = useAttendanceStore(
        (state) => state.setMarkAttendanceOpen,
    )

    const handleMarkAttendance = useCallback(
        (record: AttendanceRecord | AttendanceRecord[]) => {
            if (Array.isArray(record)) {
                setSelectedRecord(null)
            } else {
                setSelectedRecord(record)
            }
            setMarkAttendanceOpen(true)
        },
        [setSelectedRecord, setMarkAttendanceOpen],
    )

    const handleAddRecord = useCallback(() => {
        setSelectedRecord(null)
        setMarkAttendanceOpen(true)
    }, [setSelectedRecord, setMarkAttendanceOpen])

    return (
        <Container>
            <AttendanceHeader />
            <AttendanceMetrics />
            <Card bodyClass="p-0">
                <div className="p-4 border-b border-gray-200 dark:border-gray-800">
                    <AttendanceToolbar onAddRecord={handleAddRecord} />
                </div>
                <AttendanceView onMarkAttendance={handleMarkAttendance} />
            </Card>
            <MarkAttendanceDialog />
        </Container>
    )
}

const Attendance = ({ data }: AttendanceProps) => {
    return (
        <AttendanceProvider data={data}>
            <AttendanceContent />
        </AttendanceProvider>
    )
}

export default Attendance
