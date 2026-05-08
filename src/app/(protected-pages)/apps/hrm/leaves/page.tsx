import { getLeaveInitialData } from '@/server/actions/hrm'
import Leaves from './_components/Leaves'
import type { LeaveInitialData } from './types'

const LeavesPage = async () => {
    const initialData = await getLeaveInitialData()

    return <Leaves initialData={initialData as LeaveInitialData} />
}

export default LeavesPage
