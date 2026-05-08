'use client'
import LineChart from '@/components/shared/Chart/LineChart'
import ChartLegendContent from '@/components/shared/Chart/ChartLegendContent'
import ForecastCard from './ForecastCard'
import PrimaryMetric from './PrimaryMetric'
import ParametersList from './ParametersList'
import { colors } from '@/constants/colors.constant'
import type { UserGrowthForecastData } from '../types'

type Props = { data: UserGrowthForecastData }

const UserGrowthForecastCard = ({ data }: Props) => {
    return (
        <ForecastCard
            title="User Growth Forecast"
            description="Active user acquisition and growth projections"
            content={
                <div className="flex flex-col justify-between gap-4">
                    <PrimaryMetric
                        value={data.primaryMetric?.value}
                        label={data.primaryMetric.label || 'Total Users'}
                        period={data.primaryMetric.period || 'IN ONE YEAR'}
                        format="number"
                    />
                    {data.parameters && (
                        <ParametersList parameters={data.parameters} />
                    )}
                </div>
            }
            graph={
                data.chartData && (
                    <LineChart
                        data={data.chartData.map((item) => ({
                            month: item.month,
                            newUsers: item.newUsers || 0,
                            churnedUsers: item.churnedUsers || 0,
                        }))}
                        lineConfig={[
                            {
                                name: 'Forecasted new users',
                                dataKey: 'newUsers',
                                stroke: colors.emerald.chart,
                                strokeWidth: 2,
                            },
                            {
                                dataKey: 'churnedUsers',
                                name: 'Forecasted churned users',
                                stroke: colors.red.chart,
                                strokeWidth: 2,
                                strokeDasharray: '5 5',
                            },
                        ]}
                        xAxisConfig={{ dataKey: 'month' }}
                    >
                        <ChartLegendContent
                            verticalAlign="top"
                            className="!justify-end pb-8"
                        />
                    </LineChart>
                )
            }
        />
    )
}

export default UserGrowthForecastCard
