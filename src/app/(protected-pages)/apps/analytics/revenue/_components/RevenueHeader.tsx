'use client'
import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import type { DateRangePreset } from './types'

const dateRangePresets: Array<{
    value: DateRangePreset
    label: string
    shortLabel: string
}> = [
    { value: '7D', label: '7 Days', shortLabel: '7d' },
    { value: '30D', label: '30 Days', shortLabel: '30d' },
    { value: '90D', label: '90 Days', shortLabel: '90d' },
    { value: '1Y', label: '1 Year', shortLabel: '1y' },
]

type RevenueHeaderProps = {
    selectedPreset: DateRangePreset
}

const RevenueHeader = ({ selectedPreset }: RevenueHeaderProps) => {
    const appendQueryParams = useAppendQueryParams()

    return (
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
                <h4>Revenue Analytics</h4>
                <p>
                    Comprehensive insights into your revenue performance and
                    growth trends
                </p>
            </div>
            <InputGroup>
                {dateRangePresets.map((preset) => (
                    <Button
                        key={preset.value}
                        active={selectedPreset === preset.value}
                        clickFeedback={false}
                        onClick={() =>
                            appendQueryParams({ preset: preset.value })
                        }
                        block
                    >
                        <span className="hidden sm:inline">{preset.label}</span>
                        <span className="sm:hidden">{preset.shortLabel}</span>
                    </Button>
                ))}
            </InputGroup>
        </div>
    )
}

export default RevenueHeader
