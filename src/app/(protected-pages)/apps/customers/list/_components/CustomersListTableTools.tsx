'use client'

import CustomerListSearch from './CustomerListSearch'
import CustomerListTableFilter from './CustomerListTableFilter'
import CustomerListSelected from './CustomerListSelected'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const CustomersListTableTools = () => {
    const appendQueryParams = useAppendQueryParams()

    const handleInputChange = (val: string) => {
        appendQueryParams({ query: val, pageIndex: '1' })
    }

    return (
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            <div className="flex gap-2">
                <CustomerListSearch onInputChange={handleInputChange} />
                <CustomerListTableFilter />
            </div>
            <CustomerListSelected />
        </div>
    )
}

export default CustomersListTableTools
