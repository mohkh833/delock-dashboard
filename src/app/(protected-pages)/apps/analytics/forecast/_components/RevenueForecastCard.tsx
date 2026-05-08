'use client'
import BarChart from '@/components/shared/Chart/BarChart'
import ChartLegendContent from '@/components/shared/Chart/ChartLegendContent'
import ForecastCard from './ForecastCard'
import PrimaryMetric from './PrimaryMetric'
import ParametersList from './ParametersList'
import { colors } from '@/constants/colors.constant'
import type { RevenueForecastData } from '../types'

type Props = { data: RevenueForecastData }

const RevenueForecastCard = ({ data }: Props) => {
    return (
        <ForecastCard
            title="Revenue Forecast"
            description="Monthly recurring revenue projections and growth"
            content={
                <div className="flex flex-col justify-between gap-4">
                    <PrimaryMetric
                        value={data.primaryMetric?.value}
                        label={
                            data.primaryMetric.label ||
                            'Monthly Recurring Revenue'
                        }
                        period={data.primaryMetric.period || 'IN ONE YEAR'}
                        format="currency"
                    />
                    {data.parameters && (
                        <ParametersList parameters={data.parameters} />
                    )}
                </div>
            }
            graph={
                data.chartData && (
                    <BarChart
                        height={300}
                        data={data.chartData.map((item) => ({
                            month: item.month,
                            newMRR: item.newMRR || 0,
                            churnedMRR: item.churnedMRR || 0,
                        }))}
                        barConfig={[
                            {
                                dataKey: 'newMRR',
                                name: 'Forecasted new MRR',
                                barSize: 15,
                                radius: [4, 4, 0, 0],
                                color: colors.blue.chart,
                            },
                            {
                                dataKey: 'churnedMRR',
                                name: 'Forecasted churned MRR',
                                radius: [4, 4, 0, 0],
                                barSize: 15,
                                color: colors.yellow.chart,
                            },
                        ]}
                        xAxisConfig={{ dataKey: 'month' }}
                    >
                        <ChartLegendContent
                            verticalAlign="top"
                            className="!justify-end pb-8"
                        />
                    </BarChart>
                )
            }
        />
    )
}

export default RevenueForecastCard
