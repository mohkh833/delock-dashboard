'use client'
import { useRef, useMemo } from 'react'
import Button from '@/components/ui/Button'
import { LuDownload } from 'react-icons/lu'
import dayjs from 'dayjs'
import dynamic from 'next/dynamic'
import type { ReportRecord } from '../types'

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})

type ReportsExportProps = {
    data: ReportRecord[]
}

const ReportsExport = ({ data }: ReportsExportProps) => {
    const csvLink = useRef(null)

    const csvData = useMemo(() => {
        return data.map((row) => ({
            ...row,
            date: row.date ? dayjs(row.date).format('MMM DD, YYYY') : '',
            amount: row.amount ? row.amount.toFixed(2) : '',
            signupDate: row.signupDate
                ? dayjs(row.signupDate).format('MMM DD, YYYY')
                : '',
            autoRenewal: row.autoRenewal ? 'Enabled' : 'Disabled',
            timestamp: row.timestamp
                ? dayjs(row.timestamp).format('MMM DD, YYYY HH:mm')
                : '',
        }))
    }, [data])

    const filename = `reports-${dayjs().format('YYYY-MM-DD')}.csv`

    const handleDownload = () => {
        if (csvLink.current) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            ;(csvLink.current as any).link.click()
        }
    }

    return (
        <>
            <Button
                icon={<LuDownload />}
                onClick={handleDownload}
                disabled={data.length === 0}
                block
            >
                Export CSV
            </Button>
            <CSVLink
                data={csvData}
                filename={filename}
                className="hidden"
                ref={csvLink}
            />
        </>
    )
}

export default ReportsExport
