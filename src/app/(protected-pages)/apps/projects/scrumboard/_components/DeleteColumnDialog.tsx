'use client'

import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useScrumboardStore } from '../_store/useScrumboardStore'

const DeleteColumnDialog = () => {
    const selectedColumn = useScrumboardStore((s) => s.selectedColumn)
    const setSelectedColumn = useScrumboardStore((s) => s.setSelectedColumn)
    const deleteColumnDialogOpen = useScrumboardStore(
        (s) => s.deleteColumnDialogOpen,
    )
    const setDeleteColumnDialogOpen = useScrumboardStore(
        (s) => s.setDeleteColumnDialogOpen,
    )
    const setColumns = useScrumboardStore((s) => s.setColumns)

    const handleCancel = () => {
        setDeleteColumnDialogOpen(false)
        setSelectedColumn('')
    }

    const handleConfirmDelete = () => {
        setColumns((prev) => prev.filter((col) => col.id !== selectedColumn))
        setDeleteColumnDialogOpen(false)
        setSelectedColumn('')
    }

    return (
        <ConfirmDialog
            isOpen={deleteColumnDialogOpen}
            type="danger"
            title="Remove columns"
            onClose={handleCancel}
            onCancel={handleCancel}
            onConfirm={handleConfirmDelete}
        >
            <p>
                Are you sure you want to remove this column? This action
                can&apos;t be undo.
            </p>
        </ConfirmDialog>
    )
}

export default DeleteColumnDialog
