'use client'

import { useState } from 'react'
import Container from '@/components/shared/Container'
import PayrollProvider from './PayrollProvider'
import PayrollHeader from './PayrollHeader'
import PayrollMetrics from './PayrollMetrics'
import PayrollTable from './PayrollTable'
import CSVUploadDialog from './CSVUploadDialog'
import PaySlipDialog from './PaySlipDialog'
import type { GetPayrollResponse, PayrollRecord } from '../types'

type PayrollProps = {
    data: GetPayrollResponse
}

const PayrollContent = () => {
    const [csvUploadOpen, setCsvUploadOpen] = useState(false)
    const [paySlipOpen, setPaySlipOpen] = useState(false)
    const [paySlipRecord, setPaySlipRecord] = useState<PayrollRecord | null>(
        null,
    )

    const handleAddPayroll = () => setCsvUploadOpen(true)

    const handleViewPaySlip = (record: PayrollRecord) => {
        setPaySlipRecord(record)
        setPaySlipOpen(true)
    }

    return (
        <Container>
            <PayrollHeader />
            <PayrollMetrics />
            <PayrollTable
                onAddPayroll={handleAddPayroll}
                onViewPaySlip={handleViewPaySlip}
            />
            <CSVUploadDialog
                isOpen={csvUploadOpen}
                onClose={() => setCsvUploadOpen(false)}
            />
            <PaySlipDialog
                isOpen={paySlipOpen}
                onClose={() => setPaySlipOpen(false)}
                record={paySlipRecord}
            />
        </Container>
    )
}

const Payroll = ({ data }: PayrollProps) => {
    return (
        <PayrollProvider data={data}>
            <PayrollContent />
        </PayrollProvider>
    )
}

export default Payroll
