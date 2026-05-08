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
    { value: '30D', label: '1 Month', shortLabel: '1m' },
    { value: '90D', label: '3 Months', shortLabel: '3m' },
    { value: '180D', label: '6 Months', shortLabel: '6m' },
    { value: '1Y', label: '1 Year', shortLabel: '1y' },
]

type SubscriptionsHeaderProps = {
    selectedPreset: DateRangePreset
}

const SubscriptionsHeader = ({ selectedPreset }: SubscriptionsHeaderProps) => {
    const appendQueryParams = useAppendQueryParams()

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
                <h4>Subscription Analytics</h4>
                <p>
                    Comprehensive insights into your subscriber lifecycle and
                    growth patterns
                </p>
            </div>
            <div className="flex-shrink-0">
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
                            <span className="hidden sm:inline">
                                {preset.label}
                            </span>
                            <span className="sm:hidden">
                                {preset.shortLabel}
                            </span>
                        </Button>
                    ))}
                </InputGroup>
            </div>
        </div>
    )
}

export default SubscriptionsHeader
