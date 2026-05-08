'use client'
import { useRef } from 'react'
import Card from '@/components/ui/Card'
import LifeCycleConnector from './LifeCycleConnector'
import LifecycleStage from './LifecycleStage'
import useTheme from '@/utils/hooks/useTheme'
import useResponsive from '@/utils/hooks/useResponsive'
import type { LifecycleStageData } from './types'

type SubscriberLifecycleJourneyProps = {
    lifecycle: LifecycleStageData[]
}

const SubscriberLifecycleJourney = ({
    lifecycle,
}: SubscriberLifecycleJourneyProps) => {
    const direction = useTheme((s) => s.direction)

    const { larger } = useResponsive()

    const horizontalContainerRef = useRef<HTMLDivElement>(null)
    const horizontalDiv1Ref = useRef<HTMLDivElement>(null)
    const horizontalDiv2Ref = useRef<HTMLDivElement>(null)

    return (
        <Card>
            <div className="mb-6">
                <h5>Subscriber Lifecycle Journey</h5>
                <p>
                    Track subscriber progression through different engagement
                    stages
                </p>
            </div>
            <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative overflow-hidden">
                {lifecycle.map((stageData, index) => (
                    <div
                        key={stageData.stage || `stage-${index}`}
                        className="z-10 flex-1 min-w-full sm:min-w-[250px] lg:min-w-auto"
                    >
                        <LifecycleStage
                            stage={stageData.stage}
                            count={stageData.count}
                            percentage={stageData.percentage}
                            trend={stageData.trend}
                        />
                    </div>
                ))}
                <div
                    ref={horizontalContainerRef}
                    className="absolute top-1/2 lg:top-1/2 left-1/2 lg:left-0 w-full h-full lg:h-1 -translate-x-1/2 lg:translate-x-0 -translate-y-1/2 lg:-translate-y-1/2"
                >
                    <div className="flex flex-col lg:flex-row justify-between h-full lg:h-auto">
                        <div ref={horizontalDiv1Ref} />
                        <div ref={horizontalDiv2Ref} />
                    </div>
                    <LifeCycleConnector
                        duration={5}
                        reverse={direction === 'rtl'}
                        containerRef={horizontalContainerRef}
                        fromRef={horizontalDiv1Ref}
                        toRef={horizontalDiv2Ref}
                        vertical={!larger.lg}
                    />
                </div>
            </div>
        </Card>
    )
}

export default SubscriberLifecycleJourney
