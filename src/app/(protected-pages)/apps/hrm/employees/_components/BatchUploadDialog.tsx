'use client'

import { useState } from 'react'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Upload from '@/components/ui/Upload'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import IconFrame from '@/components/shared/IconFrame'
import { LiDocumentUpload } from '@/icons'
import { useEmployeesStore } from '../_store/employeesStore'
import sleep from '@/utils/sleep'

const BatchUploadDialog = () => {
    const showBatchUpload = useEmployeesStore((state) => state.showBatchUpload)
    const closeBatchUpload = useEmployeesStore(
        (state) => state.closeBatchUpload,
    )
    const [uploadedFile, setUploadedFile] = useState<File | null>(null)
    const [isProcessing, setIsProcessing] = useState(false)

    const handleFileUpload = (file: File) => {
        if (!file) return

        if (!file.name.toLowerCase().endsWith('.csv')) {
            toast.push(
                <Notification title="Error" type="danger">
                    Please upload a CSV file
                </Notification>,
            )
            return
        }

        if (file.size > 10 * 1024 * 1024) {
            toast.push(
                <Notification title="Error" type="danger">
                    File size must be less than 10MB
                </Notification>,
            )
            return
        }

        setUploadedFile(file)
    }

    const handleProcessFile = async () => {
        if (!uploadedFile) {
            toast.push(
                <Notification title="Error" type="danger">
                    Please select a file to upload
                </Notification>,
            )
            return
        }

        setIsProcessing(true)
        try {
            await sleep(1500)
            toast.push(
                <Notification title="Success" type="success">
                    Employees uploaded successfully
                </Notification>,
            )
            handleClose()
        } catch {
            toast.push(
                <Notification title="Error" type="danger">
                    Failed to process file
                </Notification>,
            )
        } finally {
            setIsProcessing(false)
        }
    }

    const handleClose = () => {
        if (!isProcessing) {
            setUploadedFile(null)
            closeBatchUpload()
        }
    }

    return (
        <Dialog isOpen={showBatchUpload} onClose={handleClose}>
            <div>
                <h5>Batch Upload Employees</h5>
                <p className="mb-4">
                    Upload multiple employees using a CSV file
                </p>
                <Upload
                    draggable
                    multiple={false}
                    accept=".csv"
                    onChange={handleFileUpload}
                >
                    <div className="text-center py-8">
                        <IconFrame className="mx-auto mb-4">
                            <LiDocumentUpload className="heading-text text-xl" />
                        </IconFrame>
                        <p className="font-medium">
                            Drop your CSV file here, or{' '}
                            <span className="text-primary cursor-pointer">
                                click to browse
                            </span>
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                            Supports CSV files up to 10MB
                        </p>
                        {uploadedFile && (
                            <p className="text-sm text-primary mt-2">
                                Selected: {uploadedFile.name} (
                                {(uploadedFile.size / 1024).toFixed(1)} KB)
                            </p>
                        )}
                    </div>
                </Upload>
                <div className="flex items-center justify-end gap-2 mt-6">
                    <Button
                        variant="subtle"
                        onClick={handleClose}
                        disabled={isProcessing}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="solid"
                        onClick={handleProcessFile}
                        loading={isProcessing}
                        disabled={!uploadedFile}
                    >
                        {isProcessing ? 'Processing...' : 'Upload'}
                    </Button>
                </div>
            </div>
        </Dialog>
    )
}

export default BatchUploadDialog
