import { getReportsData } from '@/server/actions/analytics'
import ReportHeader from './_components/ReportHeader'
import ReportActionTools from './_components/ReportActionTools'
import ReportTables from './_components/ReportTables'
import type { ReportRecord, GetReportsResponse } from './types'

export default async function ReportsPage({
    searchParams,
}: {
    searchParams: Promise<Record<string, string>>
}) {
    const params = await searchParams
    const query = params.query || ''
    const pageIndex = Number(params.pageIndex) || 1
    const pageSize = Number(params.pageSize) || 25
    const sortKey = params.sortKey || ''
    const sortOrder = params.sortOrder || ''

    const data = await getReportsData({
        query,
        pageIndex,
        pageSize,
        sortKey,
        sortOrder,
    })

    return (
        <div className="pb-4">
            <ReportHeader data={data.list as ReportRecord[]} />
            <ReportActionTools />
            <ReportTables data={data as GetReportsResponse} />
        </div>
    )
}
