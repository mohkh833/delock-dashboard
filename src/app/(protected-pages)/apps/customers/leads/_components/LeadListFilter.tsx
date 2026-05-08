import { useState } from 'react'
import Button from '@/components/ui/Button'
import Popover from '@/components/ui/Popover'
import DatePicker from '@/components/ui/DatePicker'
import Checkbox from '@/components/ui/Checkbox'
import Slider from '@/components/ui/Slider'
import { FormItem, Form } from '@/components/ui/Form'
import { LuSettings2 } from 'react-icons/lu'
import { useLeadsListStore } from '../_store/leadsListStore'
import { useForm, Controller } from 'react-hook-form'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useSearchParams } from 'next/navigation'

type FormSchema = {
    startDate: Date | null
    endDate: Date | null
    selectedTags: string[]
    leadScore: number
}

const tagOptions = [
    'VIP',
    'Frequent Buyer',
    'First-Time Buyer',
    'Refund Risk',
    'New Customer',
    'High AOV',
    'Coupon User',
    'Manual Review',
    'International',
]

const LeadListFilter = () => {
    const [filterOpen, setFilterOpen] = useState(false)
    const appendQueryParams = useAppendQueryParams()
    const searchParams = useSearchParams()

    const paramCustomerTags = searchParams.get('customerLabel')
    const paramProbability = searchParams.get('probability')

    const initialTags = paramCustomerTags
        ? paramCustomerTags.split(',')
        : tagOptions

    let initialLeadScore = 50
    if (paramProbability === 'High') initialLeadScore = 80
    if (paramProbability === 'Medium') initialLeadScore = 50
    if (paramProbability === 'Low') initialLeadScore = 20

    const setSelectAllRows = useLeadsListStore(
        (state) => state.setSelectAllRows,
    )

    const { handleSubmit, setValue, control } = useForm<FormSchema>({
        defaultValues: {
            startDate: null,
            endDate: null,
            selectedTags: initialTags,
            leadScore: initialLeadScore,
        },
    })

    const handleFilterClose = () => {
        setFilterOpen(false)
        setSelectAllRows([])
    }

    const handleFilterSubmit = (values: FormSchema) => {
        const getProbability = (leadScore: number) => {
            if (leadScore >= 80) {
                return 'High'
            } else if (leadScore >= 50) {
                return 'Medium'
            } else {
                return 'Low'
            }
        }

        appendQueryParams({
            customerLabel: values.selectedTags.join(','),
            probability: getProbability(values.leadScore),
            pageIndex: '1',
        })

        handleFilterClose()
    }

    const renderContent = () => (
        <Form className="" onSubmit={handleSubmit(handleFilterSubmit)}>
            <FormItem label="Create date">
                <div className="flex items-center gap-2">
                    <Controller
                        name="startDate"
                        control={control}
                        render={({ field }) => <DatePicker {...field} />}
                    />
                    <span>-</span>

                    <Controller
                        name="endDate"
                        control={control}
                        render={({ field }) => <DatePicker {...field} />}
                    />
                </div>
            </FormItem>
            <FormItem label="Tags">
                <Controller
                    name="selectedTags"
                    control={control}
                    render={({ field }) => (
                        <Checkbox.Group
                            className="w-full gap-0"
                            vertical
                            value={field.value}
                            onChange={field.onChange}
                        >
                            {tagOptions.map((tag) => (
                                <Checkbox
                                    className="flex-row-reverse justify-between hover:text-gray-900 py-2"
                                    key={tag}
                                    value={tag}
                                >
                                    {tag}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    )}
                />
            </FormItem>
            <FormItem label="Lead Score">
                <Controller
                    name="leadScore"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <Slider {...field} />
                        </div>
                    )}
                />
            </FormItem>
            <div className="flex justify-end gap-2 mt-4">
                <Button
                    type="button"
                    onClick={() => {
                        setValue('startDate', null)
                        setValue('endDate', null)
                        setValue('selectedTags', tagOptions)
                        setValue('leadScore', 50)
                    }}
                >
                    Reset
                </Button>
                <Button type="submit" variant="solid">
                    Apply
                </Button>
            </div>
        </Form>
    )

    return (
        <Popover
            renderTrigger={
                <div>
                    <Button className="lg:hidden" icon={<LuSettings2 />} />
                    <Button className="hidden lg:flex" icon={<LuSettings2 />}>
                        Filter
                    </Button>
                </div>
            }
            open={filterOpen}
            placement="bottom-start"
            onOpenChange={(open) => {
                if (open) setFilterOpen(true)
                else handleFilterClose()
            }}
            style={{ width: 360 }}
        >
            {renderContent()}
        </Popover>
    )
}

export default LeadListFilter
