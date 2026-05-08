'use client'

import { useState } from 'react'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useEmployeesStore } from '../_store/employeesStore'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import sleep from '@/utils/sleep'

const DeleteEmployeeDialog = () => {
    const deleteEmployee = useEmployeesStore((state) => state.deleteEmployee)
    const closeDeleteEmployee = useEmployeesStore(
        (state) => state.closeDeleteEmployee,
    )
    const deleteEmployeeById = useEmployeesStore(
        (state) => state.deleteEmployeeById,
    )
    const [isDeleting, setIsDeleting] = useState(false)

    if (!deleteEmployee) return null

    const handleConfirm = async () => {
        setIsDeleting(true)
        await sleep(500)
        deleteEmployeeById(deleteEmployee.id)
        toast.push(
            <Notification title="Success" type="success">
                Employee deleted successfully
            </Notification>,
        )
        closeDeleteEmployee()
        setIsDeleting(false)
    }

    return (
        <ConfirmDialog
            isOpen={Boolean(deleteEmployee)}
            onClose={closeDeleteEmployee}
            type="danger"
            title="Delete Employee"
            onCancel={closeDeleteEmployee}
            onConfirm={handleConfirm}
            confirmText="Delete Employee"
            cancelText="Cancel"
            confirmButtonProps={{ loading: isDeleting }}
        >
            <div className="flex items-start gap-3">
                <div className="flex-1">
                    <p className="mb-4">
                        Are you sure you want to delete{' '}
                        <strong>{deleteEmployee.personalInfo.fullName}</strong>?
                    </p>
                    <div className="space-y-2">
                        <p className="font-medium heading-text">
                            This action will permanently:
                        </p>
                        <ul className="list-disc list-inside space-y-1 ml-2">
                            <li>Remove all employee personal information</li>
                            <li>Delete job history and employment records</li>
                            <li>Remove access to company systems</li>
                            <li>Delete all uploaded documents</li>
                            <li>Remove compensation and payroll data</li>
                        </ul>
                    </div>
                </div>
            </div>
        </ConfirmDialog>
    )
}

export default DeleteEmployeeDialog
