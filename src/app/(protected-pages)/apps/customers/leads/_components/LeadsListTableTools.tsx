import DebouceInput from '@/components/shared/DebouceInput'
import { LuSearch } from 'react-icons/lu'
import LeadListFilter from './LeadListFilter'
import LeadListExport from './LeadListExport'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const LeadsListTableTools = () => {
    const appendQueryParams = useAppendQueryParams()

    const handleInputChange = (val: string) => {
        if (typeof val === 'string' && val.length > 1) {
            appendQueryParams({ query: val, pageIndex: '1' })
        }

        if (typeof val === 'string' && val.length === 0) {
            appendQueryParams({ query: '', pageIndex: '1' })
        }
    }

    return (
        <div className="flex items-center justify-between gap-2 p-4">
            <div>
                <DebouceInput
                    placeholder="Search"
                    prefix={<LuSearch className="text-lg" />}
                    onChange={(e) => handleInputChange(e.target.value)}
                />
            </div>
            <div className="flex items-center gap-2">
                <LeadListExport />
                <LeadListFilter />
            </div>
        </div>
    )
}

export default LeadsListTableTools
