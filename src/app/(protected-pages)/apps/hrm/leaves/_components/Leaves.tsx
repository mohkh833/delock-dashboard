'use client'

import Container from '@/components/shared/Container'
import { LeaveDataProvider } from '../_context/LeaveDataContext'
import LeaveHeader from './LeaveHeader'
import LeaveContent from './LeaveContent'
import type { LeaveInitialData } from '../types'

type LeavesProps = {
    initialData: LeaveInitialData
}

const Leaves = ({ initialData }: LeavesProps) => {
    return (
        <LeaveDataProvider initialData={initialData}>
            <Container className="px-4 h-full">
                <LeaveHeader />
                <LeaveContent />
            </Container>
        </LeaveDataProvider>
    )
}

export default Leaves
