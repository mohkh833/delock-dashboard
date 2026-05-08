'use client'

import { useCallback } from 'react'
import Container from '@/components/shared/Container'
import EmployeesProvider from './EmployeesProvider'
import EmployeeHeader from './EmployeeHeader'
import EmployeeToolbar from './EmployeeToolbar'
import EmployeeGridView from './EmployeeGridView'
import EmployeeListView from './EmployeeListView'
import EmployeeDetailsDrawer from './EmployeeDetailsDrawer'
import AddEmployeeDrawer from './AddEmployeeDrawer'
import DeleteEmployeeDialog from './DeleteEmployeeDialog'
import BulkEditDialog from './BulkEditDialog'
import BulkDeleteDialog from './BulkDeleteDialog'
import BatchUploadDialog from './BatchUploadDialog'
import { useEmployeesStore } from '../_store/employeesStore'
import type { GetEmployeesResponse } from '../types'

type EmployeesProps = {
    data: GetEmployeesResponse
}

const EmployeesInner = () => {
    const viewMode = useEmployeesStore((state) => state.viewMode)
    const viewEmployeeId = useEmployeesStore((state) => state.viewEmployeeId)
    const setViewEmployeeId = useEmployeesStore(
        (state) => state.setViewEmployeeId,
    )

    const handleClose = useCallback(() => {
        setViewEmployeeId(null)
    }, [setViewEmployeeId])

    return (
        <div className="flex flex-col h-full">
            <EmployeeHeader />
            <EmployeeToolbar />
            <Container className="flex-1 p-4">
                {viewMode === 'grid' ? (
                    <EmployeeGridView />
                ) : (
                    <EmployeeListView />
                )}
            </Container>
            <EmployeeDetailsDrawer
                employeeId={viewEmployeeId}
                onClose={handleClose}
            />
            <AddEmployeeDrawer />
            <DeleteEmployeeDialog />
            <BulkEditDialog />
            <BulkDeleteDialog />
            <BatchUploadDialog />
        </div>
    )
}

const Employees = ({ data }: EmployeesProps) => {
    return (
        <EmployeesProvider data={data}>
            <EmployeesInner />
        </EmployeesProvider>
    )
}

export default Employees
