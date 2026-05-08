import { getAnnouncementsInitialData } from '@/server/actions/hrm'
import Announcements from './_components/Announcements'

const AnnouncementsPage = async () => {
    const initialData = await getAnnouncementsInitialData()

    return <Announcements initialData={initialData} />
}

export default AnnouncementsPage
