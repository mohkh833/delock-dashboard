'use client'

import DebouceInput from '@/components/shared/DebouceInput'
import { LuSearch } from 'react-icons/lu'
import { useSearchParams } from 'next/navigation'

type CustomerListSearchProps = {
    onInputChange: (value: string) => void
}

const CustomerListSearch = (props: CustomerListSearchProps) => {
    const { onInputChange } = props
    const searchParams = useSearchParams()
    const query = searchParams.get('query') || ''

    return (
        <DebouceInput
            placeholder="Search"
            prefix={<LuSearch className="text-lg" />}
            defaultValue={query}
            onChange={(e) => onInputChange(e.target.value)}
        />
    )
}

export default CustomerListSearch
