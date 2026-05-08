'use client'

import { Suspense, lazy } from 'react'
import Spinner from '@/components/ui/Spinner'
import { useLeavesStore } from '../_store/leavesStore'

const CalendarView = lazy(() => import('./CalendarView'))
const LeavesView = lazy(() => import('./LeavesView'))

const LeaveContent = () => {
    const { selectedView } = useLeavesStore()

    const renderContent = () => {
        switch (selectedView) {
            case 'calendars':
                return <CalendarView />
            case 'leaves':
                return <LeavesView />
            default:
                return <CalendarView />
        }
    }

    return (
        <div className="flex-1 overflow-hidden h-[calc(100%-100px)]">
            <Suspense
                fallback={
                    <div className="flex items-center justify-center h-full">
                        <Spinner size={40} />
                    </div>
                }
            >
                {renderContent()}
            </Suspense>
        </div>
    )
}

export default LeaveContent
