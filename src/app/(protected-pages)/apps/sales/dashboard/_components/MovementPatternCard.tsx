'use client'
import Card from '@/components/ui/Card'
import { useRouter } from 'next/navigation'
import type { ReactNode } from 'react'

export type MovementPatternCardProps = {
    title: string
    icon: ReactNode
    metric: string
    metricLabel: string
    patternKey: string
}

const MovementPatternCard = ({
    title,
    icon,
    metric,
    metricLabel,
    patternKey,
}: MovementPatternCardProps) => {
    const router = useRouter()

    return (
        <Card
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() =>
                router.push(`/apps/sales/dashboard/${patternKey}`)
            }
        >
            <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl text-primary">{icon}</span>
                <h6 className="font-semibold leading-tight">{title}</h6>
            </div>
            <div>
                <p className="text-3xl font-bold heading-text">{metric}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {metricLabel}
                </p>
            </div>
        </Card>
    )
}

export default MovementPatternCard
