import Button from '@/components/ui/Button'
import { useLeadsListStore } from '../_store/leadsListStore'
import { LuDownload } from 'react-icons/lu'
import dynamic from 'next/dynamic'

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})

const LeadListExport = () => {
    const data = useLeadsListStore((state) => state.data)

    return (
        <>
            <CSVLink
                className="lg:hidden"
                filename="leads.csv"
                data={data.list}
            >
                <Button icon={<LuDownload />} />
            </CSVLink>
            <CSVLink
                className="hidden lg:block"
                filename="leads.csv"
                data={data.list}
            >
                <Button icon={<LuDownload />}>Export data</Button>
            </CSVLink>
        </>
    )
}

export default LeadListExport
