'use client'

import { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Avatar from '@/components/ui/Avatar'
import { HiPrinter, HiDownload } from 'react-icons/hi'
import sleep from '@/utils/sleep'
import type { PayrollRecord } from '../types'

type PaySlipDialogProps = {
    isOpen: boolean
    onClose: () => void
    record: PayrollRecord | null
}

const PaySlipDialog = ({ isOpen, onClose, record }: PaySlipDialogProps) => {
    const [isPrinting, setIsPrinting] = useState(false)
    const [isDownloading, setIsDownloading] = useState(false)

    if (!record) return null

    const handlePrint = async () => {
        setIsPrinting(true)
        try {
            await sleep(1000)
            window.print()
        } finally {
            setIsPrinting(false)
        }
    }

    const handleDownload = async () => {
        setIsDownloading(true)
        try {
            await sleep(1500)
        } finally {
            setIsDownloading(false)
        }
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const formatMonth = (monthString: string) => {
        return new Date(monthString + '-01').toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
        })
    }

    const earnings = [
        { label: 'Basic Salary', amount: record.basicSalary },
        { label: 'Allowances', amount: record.allowances },
    ]

    const deductions = [
        {
            label: 'Tax Deductions',
            amount: Math.round(record.deductions * 0.6),
        },
        { label: 'Insurance', amount: Math.round(record.deductions * 0.3) },
        { label: 'Other', amount: Math.round(record.deductions * 0.1) },
    ]

    const totalEarnings = earnings.reduce((sum, item) => sum + item.amount, 0)
    const totalDeductions = deductions.reduce(
        (sum, item) => sum + item.amount,
        0,
    )

    return (
        <Dialog isOpen={isOpen} onClose={onClose}>
            <div className="space-y-6">
                <div>
                    <h5>Pay Slip</h5>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar
                            size="lg"
                            src={record.employee.avatar}
                            alt={record.employee.name}
                        >
                            {record.employee.name
                                .split(' ')
                                .map((n) => n[0])
                                .join('')}
                        </Avatar>
                        <div>
                            <h5 className="heading-text">
                                {record.employee.name}
                            </h5>
                            <p className="text-sm">
                                {record.employee.department}
                            </p>
                            <p>Pay Period: {formatMonth(record.payPeriod)}</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <p>Employee ID</p>
                        <p className="font-medium">{record.employee.id}</p>
                        {record.processedAt && (
                            <>
                                <p className="mt-2">Processed Date</p>
                                <p className="font-medium">
                                    {formatDate(record.processedAt)}
                                </p>
                            </>
                        )}
                    </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <h6 className="font-semibold mb-4 heading-text">
                            Earnings
                        </h6>
                        <div className="space-y-3">
                            {earnings.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <span className="text-sm">
                                        {item.label}
                                    </span>
                                    <span className="font-medium">
                                        ${item.amount.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                            <hr className="border-gray-200 dark:border-gray-700" />
                            <div className="flex justify-between font-semibold">
                                <span>Total Earnings</span>
                                <span>${totalEarnings.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h6 className="font-semibold mb-4 heading-text">
                            Deductions
                        </h6>
                        <div className="space-y-3">
                            {deductions.map((item, index) => (
                                <div
                                    key={index}
                                    className="flex justify-between"
                                >
                                    <span className="text-sm">
                                        {item.label}
                                    </span>
                                    <span className="font-medium">
                                        ${item.amount.toLocaleString()}
                                    </span>
                                </div>
                            ))}
                            <hr className="border-gray-200 dark:border-gray-700" />
                            <div className="flex justify-between font-semibold">
                                <span>Total Deductions</span>
                                <span>${totalDeductions.toLocaleString()}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <hr className="border-gray-200 dark:border-gray-700" />

                <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                        <span className="text-lg font-semibold">Net Pay</span>
                        <span className="text-2xl font-bold text-green-600">
                            ${record.netPay.toLocaleString()}
                        </span>
                    </div>
                </div>

                <div className="flex items-center justify-end gap-3">
                    <Button variant="subtle" onClick={onClose}>
                        Close
                    </Button>
                    <Button
                        variant="subtle"
                        icon={<HiPrinter />}
                        loading={isPrinting}
                        onClick={handlePrint}
                    >
                        Print
                    </Button>
                    <Button
                        variant="solid"
                        icon={<HiDownload />}
                        loading={isDownloading}
                        onClick={handleDownload}
                    >
                        Download PDF
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default PaySlipDialog
