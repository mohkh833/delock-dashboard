'use client'
import { useEffect, useState } from 'react'
import Button from '@/components/ui/Button'
import Popover from '@/components/ui/Popover'
import AdvancedFilterBuilder from '@/components/shared/AdvancedFilterBuilder'
import { LiSetting4 } from '@/icons'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { parseQueryString } from '@/components/shared/AdvancedFilterBuilder/utils'
import { useSearchParams } from 'next/navigation'
import type {
    FieldConfig,
    RuleGroup,
} from '@/components/shared/AdvancedFilterBuilder'

const fieldList: FieldConfig[] = [
    { key: 'signupDate', label: 'Signup Date', type: 'date' },
    { key: 'lastActive', label: 'Last Active', type: 'date' },
    {
        key: 'plan',
        label: 'Plan',
        type: 'select',
        options: [
            { label: 'Basic', value: 'Basic' },
            { label: 'Standard', value: 'Standard' },
            { label: 'Pro', value: 'Pro' },
        ],
    },
    {
        key: 'status',
        label: 'Status',
        type: 'select',
        options: [
            { label: 'Paid', value: 'Paid' },
            { label: 'Pending', value: 'Pending' },
            { label: 'Failed', value: 'Failed' },
            { label: 'Refunded', value: 'Refunded' },
        ],
    },
    {
        key: 'paymentMethod',
        label: 'Payment Method',
        type: 'select',
        options: [
            { label: 'Credit Card', value: 'Credit Card' },
            { label: 'PayPal', value: 'PayPal' },
            { label: 'Bank Transfer', value: 'Bank Transfer' },
            { label: 'Stripe', value: 'Stripe' },
        ],
    },
    { key: 'amount', label: 'Amount', type: 'number' },
    {
        key: 'feature',
        label: 'Feature',
        type: 'select',
        options: [
            { label: 'Dashboard View', value: 'Dashboard View' },
            { label: 'Report Generation', value: 'Report Generation' },
            { label: 'Data Export', value: 'Data Export' },
            { label: 'User Management', value: 'User Management' },
            { label: 'Analytics View', value: 'Analytics View' },
            { label: 'File Upload', value: 'File Upload' },
            { label: 'API Access', value: 'API Access' },
            { label: 'Custom Charts', value: 'Custom Charts' },
            { label: 'Team Collaboration', value: 'Team Collaboration' },
            { label: 'Data Import', value: 'Data Import' },
            { label: 'Notification Settings', value: 'Notification Settings' },
            { label: 'Profile Update', value: 'Profile Update' },
        ],
    },
    {
        key: 'device',
        label: 'Device',
        type: 'select',
        options: [
            { label: 'Desktop', value: 'Desktop' },
            { label: 'Mobile', value: 'Mobile' },
            { label: 'Tablet', value: 'Tablet' },
        ],
    },
    {
        key: 'country',
        label: 'Country',
        type: 'select',
        options: [
            { label: 'United States', value: 'US' },
            { label: 'United Kingdom', value: 'UK' },
            { label: 'Canada', value: 'CA' },
            { label: 'Germany', value: 'DE' },
            { label: 'France', value: 'FR' },
            { label: 'Japan', value: 'JP' },
            { label: 'Australia', value: 'AU' },
            { label: 'Brazil', value: 'BR' },
            { label: 'India', value: 'IN' },
            { label: 'Turkey', value: 'TR' },
        ],
    },
]

const ReportFilters = () => {
    const [currentFilter, setCurrentFilter] = useState<RuleGroup>()
    const [filterOpen, setFilterOpen] = useState(false)
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    useEffect(() => {
        const filterQuery = searchParams.get('filter') || ''
        const parsed = parseQueryString(filterQuery)
        setCurrentFilter(parsed)
    }, [searchParams])

    const handleFilterChange = (filter: RuleGroup) => {
        setCurrentFilter(filter)
    }

    const handleApplyFilter = (queryString: string) => {
        setFilterOpen(false)
        appendQueryParams({ filter: queryString, pageIndex: 1 })
    }

    const filterCount = currentFilter?.children?.length ?? 0

    return (
        <Popover
            renderTrigger={
                <Button
                    icon={<LiSetting4 />}
                    onClick={() => setFilterOpen(!filterOpen)}
                >
                    <span className="hidden sm:flex items-center gap-1">
                        <span>Filter</span>
                        {searchParams.get('filter') && filterCount > 0 && (
                            <span className="text-xs bg-primary text-white w-4.5 h-4.5 flex items-center justify-center rounded">
                                {filterCount}
                            </span>
                        )}
                    </span>
                </Button>
            }
            open={filterOpen}
            placement="bottom-end"
            onOpenChange={setFilterOpen}
            className="p-0"
            width={'auto'}
        >
            <AdvancedFilterBuilder
                value={currentFilter}
                fields={fieldList}
                onChange={handleFilterChange}
                onApply={(_, queryString) => {
                    handleApplyFilter(queryString)
                }}
                onReset={() => {
                    appendQueryParams({ filter: '', pageIndex: 1 })
                }}
            />
        </Popover>
    )
}

export default ReportFilters
