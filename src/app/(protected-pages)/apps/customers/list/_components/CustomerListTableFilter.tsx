'use client'

import { useState } from 'react'
import Popover from '@/components/ui/Popover'
import RangeCalendar from '@/components/ui/RangeCalendar'
import PopoverFilter from '@/components/shared/PopoverFilter'
import { LiChevronDown, LiChevronUp, LiCalendar, LiTag } from '@/icons'
import dayjs from 'dayjs'
import { useSearchParams } from 'next/navigation'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const customerLabels = [
    { label: 'VIP', value: 'VIP' },
    { label: 'Frequent Buyer', value: 'Frequent Buyer' },
    { label: 'First-Time Buyer', value: 'First-Time Buyer' },
    { label: 'Refund Risk', value: 'Refund Risk' },
    { label: 'New Customer', value: 'New Customer' },
    { label: 'High AOV', value: 'High AOV' },
    { label: 'Coupon User', value: 'Coupon User' },
    { label: 'Manual Review', value: 'Manual Review' },
    { label: 'International', value: 'International' },
]

const CustomerListTableFilter = () => {
    const [dateRangePopoverOpen, setDateRangePopoverOpen] = useState(false)

    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const customerLabelValue = searchParams.get('customerLabel')
    const customerLabel = customerLabelValue
        ? customerLabelValue.split(',')
        : []
    const dateRangeValue = searchParams.get('dateRange')
    const dateRange = dateRangeValue ? dateRangeValue.split(',') : ['', '']

    const convertStringToDate = (
        dateString: string[],
    ): [Date | null, Date | null] => {
        const [startDate, endDate] = dateString

        if (!startDate || !endDate) {
            return [null, null]
        }

        return [new Date(startDate), new Date(endDate)]
    }

    const convertDateToString = (
        date: [Date | null, Date | null],
    ): [string, string] => {
        const [startDate, endDate] = date

        if (!startDate || !endDate) {
            return ['', '']
        }

        return [startDate.toISOString(), endDate.toISOString()]
    }

    const renderDateRangePopoverTitle = (dateString: string[]) => {
        const [startDate, endDate] = dateString
        let title = `${dayjs(startDate).format('MMM DD')} - ${dayjs(endDate).format('MMM DD')}`

        if (!startDate) {
            title = 'Date Range'
        }

        return (
            <>
                <LiCalendar className="text-lg md:hidden" />
                <span className="hidden md:flex items-center gap-2">
                    {title}
                    {dateRangePopoverOpen ? <LiChevronUp /> : <LiChevronDown />}
                </span>
            </>
        )
    }

    const renderCustomerLabelPopoverTitle = () => {
        let title = 'Customer Label'

        if (customerLabel.length === 1) {
            title =
                customerLabels.find((item) => item.value === customerLabel[0])
                    ?.label || 'Customer Label'
        }

        if (customerLabel.length > 1) {
            title = `${customerLabel.length} selected`
        }

        return (
            <>
                <LiTag className="text-lg md:hidden" />
                <span className="hidden md:flex items-center gap-2">
                    {title}
                </span>
            </>
        )
    }

    return (
        <div className="flex items-center gap-2">
            <Popover
                title={renderDateRangePopoverTitle(dateRange)}
                open={dateRangePopoverOpen}
                placement="bottom-start"
                onOpenChange={setDateRangePopoverOpen}
                style={{ width: 280 }}
            >
                <RangeCalendar
                    value={convertStringToDate(dateRange)}
                    onChange={(data) => {
                        const dateString = convertDateToString(data)
                        appendQueryParams({
                            dateRange: dateString.join(','),
                            pageIndex: '1',
                        })
                        if (data[1]) {
                            setDateRangePopoverOpen(false)
                        }
                    }}
                />
            </Popover>
            <PopoverFilter
                data={customerLabels}
                title={renderCustomerLabelPopoverTitle()}
                value={customerLabel}
                onChange={(data) => {
                    appendQueryParams({
                        customerLabel: data.map((item) => item.value).join(','),
                        pageIndex: '1',
                    })
                }}
            />
        </div>
    )
}

export default CustomerListTableFilter
