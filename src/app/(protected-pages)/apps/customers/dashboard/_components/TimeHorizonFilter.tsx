'use client'

import Button from '@/components/ui/Button'
import InputGroup from '@/components/ui/InputGroup'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import type { TimeHorizon } from '../types'

const TIME_HORIZONS: { value: TimeHorizon; label: string }[] = [
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' },
    { value: 'quarter', label: 'Quarter' },
]

type Props = {
    timeHorizon: TimeHorizon
}

const TimeHorizonFilter = ({ timeHorizon }: Props) => {
    const appendQueryParams = useAppendQueryParams()

    return (
        <div className="space-y-2">
            <div className="heading-text font-semibold">Time Horizon</div>
            <InputGroup className="flex">
                {TIME_HORIZONS.map((horizon) => (
                    <Button
                        key={horizon.value}
                        active={timeHorizon === horizon.value}
                        className="flex-1"
                        onClick={() =>
                            appendQueryParams({ timeHorizon: horizon.value })
                        }
                    >
                        {horizon.label}
                    </Button>
                ))}
            </InputGroup>
        </div>
    )
}

export default TimeHorizonFilter
