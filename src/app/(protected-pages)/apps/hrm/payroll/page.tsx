import dayjs from 'dayjs'
import { getPayrollInitialData } from '@/server/actions/hrm'
import Payroll from './_components/Payroll'
import type { GetPayrollResponse } from './types'
export default async function PayrollPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string | undefined>>
}) {
    const params = await searchParams
    const month = params.month || dayjs().format('YYYY-MM')
    const pageIndex = Number(params.pageIndex) || 1
    const pageSize = Number(params.pageSize) || 10
    const query = params.query || ''
    const sortKey = params.sortKey || ''
    const sortOrder = params.sortOrder || ''

    const initialData = await getPayrollInitialData({
        month,
        pageIndex,
        pageSize,
        query,
        sortKey,
        sortOrder,
    })

    return <Payroll data={initialData as GetPayrollResponse} />
}
