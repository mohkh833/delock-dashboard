import Card from '@/components/ui/Card'
import IconFrame from '@/components/shared/IconFrame'
import { orderStatisticIconMap } from './utils'
import classNames from '@/utils/classNames'
import type { GetOrderStatisticsResponse } from './types'

const OrderListStatistic = ({
    statisticData,
}: {
    statisticData: GetOrderStatisticsResponse
}) => {
    const getBorderClass = (index: number) => {
        let borderClass = ''

        if (index === 0 || index === 2) {
            borderClass =
                'border-b border-r-0 md:border-b-0 md:ltr:border-r md:rtl:border-l border-gray-200 dark:border-gray-700 pb-4 md:pb-0'
        }

        if (index === 1) {
            borderClass =
                'border-b md:border-b-0 xl:ltr:border-r xl:rtl:border-l border-gray-200 dark:border-gray-700 pb-4 md:pb-0'
        }

        return borderClass
    }

    return (
        <Card bodyClass="px-0 md:px-2" className="print:hidden">
            <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4">
                {statisticData &&
                    statisticData.map((item, index) => (
                        <div
                            key={item.id}
                            className={classNames(
                                'px-4',
                                getBorderClass(index),
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <IconFrame>
                                    <span className="text-xl heading-text">
                                        {orderStatisticIconMap[item.id]}
                                    </span>
                                </IconFrame>
                                <div>
                                    <span className="font-medium">
                                        {item.label}
                                    </span>
                                    <div className="flex items-end gap-4">
                                        <div className="flex items-center gap-1">
                                            <h6 className="font-semibold">
                                                {item.value}
                                            </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
        </Card>
    )
}

export default OrderListStatistic
