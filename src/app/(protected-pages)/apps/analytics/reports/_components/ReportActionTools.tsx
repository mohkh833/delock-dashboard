'use client'
import { useMemo } from 'react'
import { create } from 'zustand'
import DebounceInput from '@/components/shared/DebouceInput'
import Button from '@/components/ui/Button'
import PopoverFilter from '@/components/shared/PopoverFilter'
import { LiGrid9, LiSearch } from '@/icons'
import ReportFilters from './ReportFilters'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

type ColumnsState = {
    visibleColumns: string[]
    setVisibleColumns: (cols: string[]) => void
}

export const useReportColumnsStore = create<ColumnsState>((set) => ({
    visibleColumns: [
        'plan',
        'customer',
        'email',
        'amount',
        'status',
        'featureUsed',
    ],
    setVisibleColumns: (visibleColumns) => set({ visibleColumns }),
}))

const allColumns = [
    'plan',
    'featureUsed',
    'device',
    'customer',
    'email',
    'amount',
    'paymentMethod',
    'status',
    'country',
    'signupDate',
    'lastActive',
    'mrrRange',
    'autoRenewal',
]

const toReadableText = (str: string) => {
    const withSpaces = str.replace(/([A-Z])/g, ' $1')
    return withSpaces.charAt(0).toUpperCase() + withSpaces.slice(1)
}

const ReportActionTools = () => {
    const { visibleColumns, setVisibleColumns } = useReportColumnsStore()
    const appendQueryParams = useAppendQueryParams()

    const columnOptions = useMemo(
        () =>
            allColumns.map((col) => ({
                label: toReadableText(col),
                value: col,
            })),
        [],
    )

    const handleSearch = (query: string) => {
        appendQueryParams({ query, pageIndex: 1 })
    }

    return (
        <div className="border-b border-gray-200 dark:border-gray-800">
            <div className="p-4">
                <div className="flex items-center justify-between gap-4">
                    <div className="flex-1 sm:flex-none">
                        <DebounceInput
                            wait={300}
                            placeholder="Search..."
                            prefix={<LiSearch />}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <PopoverFilter
                            data={columnOptions}
                            value={visibleColumns}
                            onChange={(selected) =>
                                setVisibleColumns(
                                    selected.map((item) => item.value),
                                )
                            }
                            placement="bottom-end"
                            title="Columns"
                            showReset={false}
                            renderTrigger={
                                <Button icon={<LiGrid9 />}>
                                    <span className="hidden sm:inline">
                                        Column View
                                    </span>
                                </Button>
                            }
                        />
                        <ReportFilters />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ReportActionTools
