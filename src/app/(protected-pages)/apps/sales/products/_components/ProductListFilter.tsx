'use client'
import { useMemo, useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import Popover from '@/components/ui/Popover'
import Checkbox from '@/components/ui/Checkbox'
import Tag from '@/components/ui/Tag'
import Slider from '@/components/ui/Slider'
import { FormItem, Form } from '@/components/ui/Form'
import NumericInput from '@/components/shared/NumericInput'
import Historgram from '@/components/shared/Historgram'
import { useProductListStore } from '../_store/productListStore'
import { LiSetting4 } from '@/icons'
import { categoryMap, stockLevelMap } from '../_utils'
import { useSearchParams } from 'next/navigation'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useForm, Controller } from 'react-hook-form'
import classNames from '@/utils/classNames'

type FormSchema = {
    priceRange: [number, number]
    categories: string[]
    stockLevel: string[]
}

const ProductListFilter = () => {
    const data = useProductListStore((state) => state.data)
    const [filterOpen, setFilterOpen] = useState(false)

    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const categoriesFilter = searchParams.get('categories')
        ? (searchParams.get('categories') as string).split(',')
        : []
    const stockLevelFilter = searchParams.get('stockLevel')
        ? (searchParams.get('stockLevel') as string).split(',')
        : []
    const priceRangeFilter = searchParams.get('priceRange')
        ? ((searchParams.get('priceRange') as string)
              .split(',')
              .map((it) => parseInt(it))
              .slice(0, 2) as [number, number])
        : [data?.meta.lowestPrice, data?.meta.highestPrice]

    const setSelectAllRows = useProductListStore(
        (state) => state.setSelectAllRows,
    )

    const categoryOptions = useMemo(
        () =>
            Object.entries(categoryMap).map(([key, value]) => ({
                label: value.label,
                value: key,
            })),
        [],
    )

    const stockLevelOptions = useMemo(
        () =>
            Object.entries(stockLevelMap).map(([key, value]) => ({
                label: value.label,
                value: key,
            })),
        [],
    )

    const { handleSubmit, setValue, control, watch } = useForm<FormSchema>({
        defaultValues: {
            categories: categoriesFilter,
            stockLevel: stockLevelFilter,
        },
    })

    useEffect(() => {
        if (data && priceRangeFilter) {
            setValue('priceRange', priceRangeFilter as [number, number])
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [setValue, data, priceRangeFilter[0], priceRangeFilter[1]])

    const handleFilterClose = () => {
        setFilterOpen(false)
        setSelectAllRows([])
    }

    const resetData = () => {
        if (data) {
            setValue('priceRange', [
                data?.meta.lowestPrice,
                data?.meta.highestPrice,
            ])
        }
        setValue('categories', [])
        setValue('stockLevel', [])

        appendQueryParams({
            categories: '',
            priceRange: '',
            stockLevel: '',
            pageIndex: '1',
        })
    }

    const handleFilterSubmit = (values: FormSchema) => {
        appendQueryParams({
            categories:
                values.categories.length > 0 ? values.categories.join(',') : '',
            priceRange: values.priceRange.join(','),
            stockLevel:
                values.stockLevel.length > 0 ? values.stockLevel.join(',') : '',
            pageIndex: '1',
        })

        handleFilterClose()
    }

    const renderContent = () => (
        <Form onSubmit={handleSubmit(handleFilterSubmit)}>
            <FormItem label="Price Range">
                <Controller
                    name="priceRange"
                    control={control}
                    render={({ field }) => (
                        <div>
                            <div className="my-2">
                                {data?.meta && (
                                    <Historgram
                                        data={data?.meta.rangeData || []}
                                        min={data?.meta.lowestPrice || 0}
                                        max={data?.meta.highestPrice || 100}
                                        range={
                                            watch('priceRange') || [
                                                data?.meta.lowestPrice || 0,
                                                data?.meta.highestPrice || 100,
                                            ]
                                        }
                                    />
                                )}
                            </div>
                            <div className="mx-1.5">
                                <Slider.Range
                                    min={data?.meta.lowestPrice || 0}
                                    max={data?.meta.highestPrice || 100}
                                    value={field.value}
                                    onChange={field.onChange}
                                />
                            </div>
                            <div className="flex gap-2 mt-4">
                                <NumericInput
                                    thousandSeparator
                                    type="text"
                                    inputPrefix="$"
                                    value={field.value[0]}
                                    min={data?.meta.lowestPrice || 0}
                                    max={data?.meta.highestPrice || 100}
                                    onChange={(value) =>
                                        field.onChange([value, field.value[1]])
                                    }
                                />
                                <NumericInput
                                    value={field.value[1]}
                                    thousandSeparator
                                    type="text"
                                    inputPrefix="$"
                                    min={data?.meta.lowestPrice || 0}
                                    max={data?.meta.highestPrice || 100}
                                    onChange={(value) =>
                                        field.onChange([field.value[0], value])
                                    }
                                />
                            </div>
                        </div>
                    )}
                />
            </FormItem>
            <FormItem label="Categories">
                <Controller
                    name="categories"
                    control={control}
                    render={({ field }) => (
                        <div className="flex flex-wrap gap-2">
                            {categoryOptions.map((category) => (
                                <button
                                    key={category.value}
                                    type="button"
                                    onClick={() =>
                                        field.onChange(
                                            field.value.includes(category.value)
                                                ? field.value.filter(
                                                      (item) =>
                                                          item !==
                                                          category.value,
                                                  )
                                                : [
                                                      ...field.value,
                                                      category.value,
                                                  ],
                                        )
                                    }
                                >
                                    <Tag
                                        className={classNames(
                                            'bg-transparent',
                                            field.value.includes(category.value)
                                                ? ` border-primary text-primary`
                                                : 'opacity-50 hover:opacity-100',
                                        )}
                                    >
                                        <span>{category.label}</span>
                                    </Tag>
                                </button>
                            ))}
                        </div>
                    )}
                />
            </FormItem>
            <FormItem label="Stock Level">
                <Controller
                    name="stockLevel"
                    control={control}
                    render={({ field }) => (
                        <Checkbox.Group
                            className="w-full gap-0"
                            vertical
                            value={field.value}
                            onChange={field.onChange}
                        >
                            {stockLevelOptions.map((stockLevel) => (
                                <Checkbox
                                    className="flex-row-reverse justify-between hover:text-gray-900 py-1.5"
                                    key={stockLevel.value}
                                    value={stockLevel.value}
                                >
                                    {stockLevel.label}
                                </Checkbox>
                            ))}
                        </Checkbox.Group>
                    )}
                />
            </FormItem>
            <div className="flex justify-end gap-2 mt-4">
                <Button type="button" onClick={resetData}>
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
                <div className="inline-flex">
                    <Button className="sm:hidden" icon={<LiSetting4 />} />
                    <Button className="hidden sm:flex" icon={<LiSetting4 />}>
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
            style={{ width: 350 }}
        >
            {renderContent()}
        </Popover>
    )
}

export default ProductListFilter
