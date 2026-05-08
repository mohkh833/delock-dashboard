'use client'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { LiDownload, LiTickCircle, LiAdd } from '@/icons'
import dynamic from 'next/dynamic'

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})
import type { GetOrderListResponse, OrderListSearchParams } from './types'

const rangeOptions = [
    { value: '30', label: 'Last 30 days' },
    { value: '60', label: 'Last 60 days' },
    { value: '90', label: 'Last 90 days' },
]

const OrderListHeader = ({
    data,
    searchParams,
}: {
    data: GetOrderListResponse
    searchParams: OrderListSearchParams
}) => {
    const router = useRouter()
    const appendQueryParams = useAppendQueryParams()

    const value = searchParams?.range || '30'

    return (
        <div className="flex items-center justify-between gap-4 print:hidden">
            <h4>Order List</h4>
            <div className="flex items-center gap-2">
                <Dropdown
                    placement="bottom-end"
                    menuClass="min-w-[180px]"
                    onSelect={(val) => appendQueryParams({ range: val })}
                    renderTitle={
                        <div className="flex items-center gap-2">
                            <Button className="sm:hidden">{value + 'd'}</Button>
                            <Button className="hidden sm:block">
                                {
                                    rangeOptions.find(
                                        (option) => option.value === value,
                                    )?.label
                                }
                            </Button>
                        </div>
                    }
                >
                    {rangeOptions.map((option) => (
                        <Dropdown.Item
                            key={option.value}
                            eventKey={option.value}
                        >
                            <span className="flex items-center justify-between w-full">
                                <span>{option.label}</span>
                                {value === option.value && <LiTickCircle />}
                            </span>
                        </Dropdown.Item>
                    ))}
                </Dropdown>
                <CSVLink
                    filename="customerList.csv"
                    data={data?.list || []}
                    className="sm:hidden"
                >
                    <Button icon={<LiDownload />} />
                </CSVLink>
                <CSVLink
                    filename="customerList.csv"
                    data={data?.list || []}
                    className="hidden sm:block"
                >
                    <Button icon={<LiDownload />}>Export</Button>
                </CSVLink>
                <Button
                    className="sm:hidden"
                    variant="solid"
                    icon={<LiAdd />}
                    onClick={() => router.push('/apps/sales/order')}
                />
                <Button
                    className="hidden sm:block"
                    variant="solid"
                    onClick={() => router.push('/apps/sales/order')}
                >
                    Add Order
                </Button>
            </div>
        </div>
    )
}

export default OrderListHeader
