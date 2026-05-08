'use client'
import Select from '@/components/ui/Select'
import Button from '@/components/ui/Button'
import SelectInputWithPrefix from '@/components/shared/SelectInputWithPrefix'
import SelectOptionWithPrefix from '@/components/shared/SelectOptionWithPrefix'
import classNames from '@/utils/classNames'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { LiDownload } from '@/icons'
import type { Scenario } from '../types'

const scenarioOptions = [
    { value: 'best-case' as Scenario, label: 'Best Case', color: 'bg-success' },
    { value: 'expected' as Scenario, label: 'Expected', color: 'bg-primary' },
    {
        value: 'worst-case' as Scenario,
        label: 'Worst Case',
        color: 'bg-error',
    },
]

const dateRangeOptions = [
    { value: 'next-3-month', label: 'Next 3 Months' },
    { value: 'next-6-month', label: 'Next 6 Months' },
    { value: 'next-12-month', label: 'Next 12 Months' },
]

type ForecastHeaderProps = {
    scenario: string
    dateRange: string
}

const ForecastHeader = ({ scenario, dateRange }: ForecastHeaderProps) => {
    const appendQueryParams = useAppendQueryParams()

    return (
        <header className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4 mb-6">
            <div>
                <h4>Forecast</h4>
                <p>
                    Predictive insights across revenue, growth, and retention
                    metrics
                </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex flex-col sm:flex-row gap-3">
                    <Select
                        className="w-40"
                        options={dateRangeOptions}
                        value={dateRangeOptions.find(
                            (opt) => opt.value === dateRange,
                        )}
                        onChange={(selected) =>
                            appendQueryParams({ dateRange: selected.value })
                        }
                    />
                </div>
                <Select
                    className="w-40"
                    options={scenarioOptions}
                    value={scenarioOptions.find(
                        (opt) => opt.value === scenario,
                    )}
                    onChange={(selected) =>
                        appendQueryParams({ scenario: selected.value })
                    }
                    customInputDisplay={(selectedItem) => (
                        <SelectInputWithPrefix
                            label={selectedItem?.label}
                            prefix={
                                selectedItem && (
                                    <span
                                        className={classNames(
                                            'h-2.5 w-2.5 rounded-full',
                                            selectedItem.color,
                                        )}
                                    ></span>
                                )
                            }
                        />
                    )}
                    customOption={({ option, selected, CheckIcon }) => (
                        <SelectOptionWithPrefix
                            label={option.label}
                            prefix={
                                <span
                                    className={classNames(
                                        'h-2 w-2 rounded-full',
                                        option.color,
                                    )}
                                ></span>
                            }
                            selected={selected}
                            checkIcon={CheckIcon}
                        />
                    )}
                />
                <Button icon={<LiDownload />}>Export</Button>
            </div>
        </header>
    )
}

export default ForecastHeader
