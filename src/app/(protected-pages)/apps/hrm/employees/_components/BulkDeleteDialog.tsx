'use client'

import { useState } from 'react'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useEmployeesStore } from '../_store/employeesStore'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import sleep from '@/utils/sleep'

const BulkDeleteDialog = () => {
    const selectedEmployees = useEmployeesStore(
        (state) => state.selectedEmployees,
    )
    const clearSelection = useEmployeesStore((state) => state.clearSelection)
    const showBulkDelete = useEmployeesStore((state) => state.showBulkDelete)
    const closeBulkDelete = useEmployeesStore((state) => state.closeBulkDelete)
    const bulkDeleteEmployees = useEmployeesStore(
        (state) => state.bulkDeleteEmployees,
    )
    const [isDeleting, setIsDeleting] = useState(false)

    const handleConfirm = async () => {
        setIsDeleting(true)
        await sleep(500)
        bulkDeleteEmployees(selectedEmployees)
        toast.push(
            <Notification title="Success" type="success">
                Employees deleted successfully
            </Notification>,
        )
        clearSelection()
        closeBulkDelete()
        setIsDeleting(false)
    }

    return (
        <ConfirmDialog
            isOpen={showBulkDelete}
            onClose={closeBulkDelete}
            type="danger"
            title="Delete Employees"
            onCancel={closeBulkDelete}
            onConfirm={handleConfirm}
            confirmText="Delete"
            cancelText="Cancel"
            confirmButtonProps={{ loading: isDeleting }}
        >
            <div className="flex items-start gap-2">
                <div className="flex-1">
                    <p>
                        Are you sure you want to delete{' '}
                        <span className="font-medium heading-text">
                            {selectedEmployees.length} employee
                            {selectedEmployees.length > 1 ? 's' : ''}
                        </span>
                        ? This action cannot be undone. All employee data,
                        including personal information, job history, and
                        documents will be permanently removed.
                    </p>
                </div>
            </div>
        </ConfirmDialog>
    )
}

export default BulkDeleteDialog
