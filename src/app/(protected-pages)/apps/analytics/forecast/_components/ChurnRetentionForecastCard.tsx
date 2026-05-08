'use client'
import { useState } from 'react'
import Card from '@/components/ui/Card'
import Loading from '@/components/shared/Loading'
import { CohortChart } from '@/components/shared/Chart'
import { LiLightbulbOn } from '@/icons'
import type { ChurnRetentionForecastData } from '../types'

type Props = { data: ChurnRetentionForecastData }

const ChurnRetentionForecastCard = ({ data }: Props) => {
    const [selectedCohort, setSelectedCohort] = useState<string | null>(null)

    const timeUnits = data?.chartData
        ? Array.from(
              {
                  length: Math.max(
                      ...Object.values(data.chartData).map(
                          (cohort) => cohort.periods.length,
                      ),
                  ),
              },
              (_, i) => `Period ${i + 1}`,
          )
        : []

    const { parameters } = data
    const trendText = parameters.churnTrend
    const trendColor =
        parameters.churnTrend === 'improving'
            ? 'text-green-600'
            : parameters.churnTrend === 'declining'
              ? 'text-red-600'
              : 'text-blue-600'

    const current = parameters.currentRetention
    const target = parameters.targetRetention
    const change = target - current

    return (
        <Card>
            <div className="mb-4">
                <h5>Churn & Retention Forecast</h5>
                <div className="leading-relaxed mt-4">
                    <Card>
                        <div className="flex gap-4">
                            <div className="mt-1">
                                <LiLightbulbOn className="heading-text text-xl" />
                            </div>
                            <span>
                                Retention is currently at{' '}
                                <span className="heading-text font-medium">
                                    {current}%
                                </span>
                                ,
                                {Math.abs(change) < 1 ? (
                                    <>
                                        which is on par with the target
                                        benchmark of{' '}
                                        <span className="heading-text font-medium">
                                            {target}%
                                        </span>
                                        .{' '}
                                    </>
                                ) : change > 0 ? (
                                    <>
                                        with a target to reach{' '}
                                        <span className="heading-text font-medium">
                                            {target}%
                                        </span>{' '}
                                        (
                                        <span className="heading-text font-medium">
                                            {change.toFixed(1)} percentage point
                                            improvement
                                        </span>
                                        ).{' '}
                                    </>
                                ) : (
                                    <>
                                        which is above the conservative target
                                        of{' '}
                                        <span className="heading-text font-medium">
                                            {target}%
                                        </span>
                                        .{' '}
                                    </>
                                )}
                                The trend is{' '}
                                <span className={`font-medium ${trendColor}`}>
                                    {trendText}
                                </span>
                                .
                            </span>
                        </div>
                    </Card>
                </div>
            </div>
            <div>
                <Loading className="min-h-[300px]" loading={false}>
                    {data?.chartData && (
                        <div className="mt-4">
                            <CohortChart
                                data={data.chartData}
                                timeUnits={timeUnits}
                                valueFormatter={(value) =>
                                    value.toLocaleString()
                                }
                                onCohortSelect={setSelectedCohort}
                                selectedCohort={selectedCohort}
                                minValue={0}
                                maxValue={100}
                                showLegend={true}
                                legendTitle="Retention Rate"
                                customerCohortCell={(cohort) => (
                                    <>
                                        <div className="font-medium heading-text">
                                            {cohort.key}
                                        </div>
                                        <div className="text-xs font-medium">
                                            {cohort.value} Users
                                        </div>
                                    </>
                                )}
                                cohortHeaderText="Cohort"
                                sizeLabelText="Initial Users"
                                percentageSuffix="%"
                            />
                        </div>
                    )}
                </Loading>
            </div>
        </Card>
    )
}

export default ChurnRetentionForecastCard
