import ReportsExport from './ReportsExport'
import type { ReportRecord } from '../types'

type ReportHeaderProps = {
    data: ReportRecord[]
}

const ReportHeader = ({ data }: ReportHeaderProps) => {
    return (
        <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="p-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h4 className="heading-text">Analytics Reports</h4>
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <ReportsExport data={data} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportHeader
