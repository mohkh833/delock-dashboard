'use client'
import StatisticCard from '@/components/shared/StatisticCard'
import IconFrame from '@/components/shared/IconFrame'
import { LiUser } from '@/icons'
import formatNumber from '@/utils/formatNumber'
import useTranslation from '@/utils/hooks/useTranslation'

type PresenceMetricCardProps = {
    selectedCategory: string
}

const categoryValues: Record<string, number> = {
    employees: 0,
    visitors: 0,
    dailyWorkers: 0,
}

const PresenceMetricCard = ({ selectedCategory }: PresenceMetricCardProps) => {
    const t = useTranslation('nav.appsAiDashboard.presenceCard')

    return (
        <StatisticCard inset>
            <div className="flex items-center gap-4">
                <IconFrame>
                    <span className="text-xl heading-text">
                        <LiUser />
                    </span>
                </IconFrame>
            </div>
            <div className="mt-4">
                <p>{t('title')}</p>
                <h4>{formatNumber(categoryValues[selectedCategory] ?? 0)}</h4>
            </div>
        </StatisticCard>
    )
}

export default PresenceMetricCard
