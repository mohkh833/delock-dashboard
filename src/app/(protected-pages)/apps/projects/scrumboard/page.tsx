import { getScrumboard } from '@/server/actions/projects'
import ScrumboardProvider from './_components/ScrumboardProvider'

export default async function ScrumboardPage() {
    const data = await getScrumboard()
    return <ScrumboardProvider initialData={data} />
}
