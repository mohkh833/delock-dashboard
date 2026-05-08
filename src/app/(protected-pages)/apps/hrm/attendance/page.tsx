import dayjs from 'dayjs'
import { getAttendanceInitialData } from '@/server/actions/hrm'
import Attendance from './_components/Attendance'

export default async function AttendancePage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams

    const date = (searchParams.date as string) || dayjs().format('YYYY-MM-DD')
    const pageIndex = Number(searchParams.pageIndex) || 1
    const pageSize = Number(searchParams.pageSize) || 10
    const query = (searchParams.query as string) || ''
    const status = (searchParams.status as string) || ''
    const sortKey = (searchParams.sortKey as string) || ''
    const sortOrder = (searchParams.sortOrder as string) || ''

    const initialData = await getAttendanceInitialData({
        date,
        pageIndex,
        pageSize,
        query,
        status,
        sortKey,
        sortOrder,
    })

    return <Attendance data={initialData} />
}
