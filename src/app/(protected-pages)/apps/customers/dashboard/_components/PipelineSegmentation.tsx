'use client'

import Checkbox from '@/components/ui/Checkbox'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import type { PipelineStages } from '../types'

const PIPELINE_STAGES: { key: keyof PipelineStages; label: string }[] = [
    { key: 'prospecting', label: 'Prospecting' },
    { key: 'qualified', label: 'Qualified' },
    { key: 'negotiation', label: 'Negotiation' },
    { key: 'closedWon', label: 'Closed Won' },
]

type Props = {
    pipelineStages: PipelineStages
}

const PipelineSegmentation = ({ pipelineStages }: Props) => {
    const appendQueryParams = useAppendQueryParams()

    const handleToggle = (key: keyof PipelineStages) => {
        const selectedCount =
            Object.values(pipelineStages).filter(Boolean).length

        if (pipelineStages[key] && selectedCount <= 2) {
            toast.push(
                <Notification
                    type="warning"
                    title="Minimum Selection Required"
                    duration={3000}
                >
                    At least 2 pipeline stages must be selected
                </Notification>,
            )
            return
        }

        const updated = { ...pipelineStages, [key]: !pipelineStages[key] }
        const activeStages = Object.entries(updated)
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(',')

        appendQueryParams({ stages: activeStages })
    }

    return (
        <div className="space-y-2">
            <div className="heading-text font-semibold">Pipeline Stages</div>
            <div className="space-y-2">
                {PIPELINE_STAGES.map((stage) => (
                    <div key={stage.key} className="flex items-center gap-2">
                        <Checkbox
                            checked={pipelineStages[stage.key]}
                            onChange={() => handleToggle(stage.key)}
                        >
                            <span>{stage.label}</span>
                        </Checkbox>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default PipelineSegmentation
