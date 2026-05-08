'use client'

import Card from '@/components/ui/Card'
import { useReferralData } from './DataContext'

const ReferralStats = () => {
    const { data } = useReferralData()

    const formatReward = (amount: number, currency: string, type: string) => {
        if (type === 'cash') {
            return `${currency} $${amount.toFixed(2)}`
        } else if (type === 'credits') {
            return `${amount} Credits`
        } else if (type === 'discount') {
            return `${amount}% Off`
        }
        return `${currency} $${amount.toFixed(2)}`
    }

    const stats = [
        {
            id: 'invitations',
            title: 'Invitations sent',
            value: data.stats.invitationsSent,
        },
        {
            id: 'signups',
            title: 'Sign-ups via your link',
            value: data.stats.signupsViaLink,
        },
        {
            id: 'conversion',
            title: 'Conversion rate',
            value: `${data.stats.conversionRate.toFixed(1)}%`,
        },
        {
            id: 'rewards',
            title: 'Rewards earned',
            value: formatReward(
                data.stats.rewardsEarned.amount,
                data.stats.rewardsEarned.currency,
                data.stats.rewardsEarned.type,
            ),
        },
    ]

    return (
        <Card>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div
                        className="p-4 text-center border-b sm:border-b-0 sm:border-r last:border-0 border-gray-200 dark:border-gray-800"
                        key={stat.id}
                    >
                        <div className="font-medium">{stat.title}</div>
                        <h4 className="heading-text mb-1">
                            {typeof stat.value === 'number'
                                ? stat.value.toLocaleString()
                                : stat.value}
                        </h4>
                    </div>
                ))}
            </div>
        </Card>
    )
}

export default ReferralStats
