import OverflowTabs from '@/components/shared/OverflowTabs'
import { useLeadsListStore } from '../_store/leadsListStore'
import { LuUsers, LuBookUser, LuUserCheck, LuUserX } from 'react-icons/lu'

const tabList = [
    {
        label: (
            <span className="flex items-center gap-2">
                <LuUsers className="text-lg" />
                <span>All Leads</span>
            </span>
        ),
        value: '',
    },
    {
        label: (
            <span className="flex items-center gap-2">
                <LuBookUser className="text-lg" />
                <span>Contacted</span>
            </span>
        ),
        value: 'Contacted',
    },
    {
        label: (
            <span className="flex items-center gap-2">
                <LuUserCheck className="text-lg" />
                <span>Qualified</span>
            </span>
        ),
        value: 'Qualified',
    },
    {
        label: (
            <span className="flex items-center gap-2">
                <LuUserX className="text-lg" />
                <span>Unqualified</span>
            </span>
        ),
        value: 'Unqualified',
    },
]

import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useSearchParams } from 'next/navigation'

const LeadsTypeTab = () => {
    const appendQueryParams = useAppendQueryParams()
    const searchParams = useSearchParams()

    const leadStatus = searchParams.get('leadStatus') || ''

    const setSelectAllRows = useLeadsListStore(
        (state) => state.setSelectAllRows,
    )

    const handleChange = (value: string) => {
        appendQueryParams({ leadStatus: value, pageIndex: '1' })
        setSelectAllRows([])
    }

    return (
        <OverflowTabs
            tabList={tabList}
            value={leadStatus}
            onChange={handleChange}
            tabListClass="px-4 dark:border-gray-800"
        />
    )
}

export default LeadsTypeTab
