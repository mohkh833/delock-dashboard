'use client'
import MovementPatternCard from './MovementPatternCard'
import movementMockData from '../_utils/movementMockData'
import useTranslation from '@/utils/hooks/useTranslation'
import {
    LiArrowLeftRight,
    LiLoginCurve,
    LiUserOctagon,
    LiPresentionChart,
} from '@/icons'

const MovementPatternsSection = () => {
    const t = useTranslation('nav.appsAiDashboard.movementPatterns')

    const cards = [
        {
            patternKey: 'employee-transfers',
            title: t('employeeTransfers'),
            icon: <LiArrowLeftRight />,
            ...movementMockData['employee-transfers'],
        },
        {
            patternKey: 'entry-exit-rate',
            title: t('entryExitRate'),
            icon: <LiLoginCurve />,
            ...movementMockData['entry-exit-rate'],
        },
        {
            patternKey: 'presence-outside-hours',
            title: t('presenceOutsideHours'),
            icon: <LiUserOctagon />,
            ...movementMockData['presence-outside-hours'],
        },
        {
            patternKey: 'staffing-forecast',
            title: t('staffingForecast'),
            icon: <LiPresentionChart />,
            ...movementMockData['staffing-forecast'],
        },
    ]

    return (
        <div>
            <h5 className="mb-4 font-semibold">{t('sectionTitle')}</h5>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {cards.map((card) => (
                    <MovementPatternCard
                        key={card.patternKey}
                        patternKey={card.patternKey}
                        title={card.title}
                        icon={card.icon}
                        metric={card.metric}
                        metricLabel={t(card.metricLabelKey)}
                    />
                ))}
            </div>
        </div>
    )
}

export default MovementPatternsSection
