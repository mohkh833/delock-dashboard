import { useMemo } from 'react'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import Switcher from '@/components/ui/Switcher'
import { LiChevronDown } from '@/icons'
import { formatDate } from '@/utils/formatDate'
import { useAppendQueryParams } from '@/utils/hooks/useAppendQueryParams'
import { useSearchParams } from 'next/navigation'
import type { SalesDashboardHeaderProps, TimeRange } from '../types'

const AiDashboardHeader = ({
    userName,
    currentDate,
}: SalesDashboardHeaderProps) => {
    const appendParams = useAppendQueryParams()
    const searchParams = useSearchParams()

    const timeRange =
        (searchParams.get('timeRange') as TimeRange) || 'thisMonth'
    const comparisonEnabled = searchParams.get('comparisonEnabled') !== 'false'

    const formattedDate = useMemo(
        () => formatDate(currentDate, 'dddd, DD MMMM YYYY'),
        [currentDate],
    )

    const displayName = userName || 'User'

    const timeRangeOptions = [
        { key: 'thisWeek', label: 'This Week' },
        { key: 'thisMonth', label: 'This Month' },
        { key: 'thisQuarter', label: 'This Quarter' },
        { key: 'thisYear', label: 'This Year' },
    ]

    const currentTimeRangeLabel =
        timeRangeOptions.find((opt) => opt.key === timeRange)?.label ||
        'This Month'

    const handleTimeRangeSelect = (eventKey: string) => {
        appendParams({ timeRange: eventKey })
    }

    const handleComparisonToggle = (checked: boolean) => {
        appendParams({ comparisonEnabled: checked })
    }

    return (
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4 space-y-4 lg:space-y-0">
            <div>
                <h4>Hey, {displayName}</h4>
                <p className="mt-1">{formattedDate}</p>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <div className="flex items-center gap-2">
                    <span className="heading-text">Comparison:</span>
                    <Switcher
                        checked={comparisonEnabled}
                        onChange={handleComparisonToggle}
                    />
                </div>
                <div className="flex items-center gap-2">
                    <span className="heading-text">Time Range:</span>
                    <Dropdown
                        activeKey={timeRange}
                        renderTitle={
                            <Button
                                icon={<LiChevronDown className="text-sm" />}
                                iconAlignment="end"
                            >
                                {currentTimeRangeLabel}
                            </Button>
                        }
                        placement="bottom-end"
                    >
                        {timeRangeOptions.map((option) => (
                            <Dropdown.Item
                                key={option.key}
                                eventKey={option.key}
                                onSelect={handleTimeRangeSelect}
                            >
                                {option.label}
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            </div>
        </div>
    )
}

export default AiDashboardHeader
