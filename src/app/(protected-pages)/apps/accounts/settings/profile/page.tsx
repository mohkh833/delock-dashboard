import { getSettingsProfile } from '@/server/actions/accounts'
import Profile from './_components/Profile'
import type { GetSettingsProfileResponse } from '../types'

export default async function ProfilePage() {
    const data = await getSettingsProfile()
    return <Profile initialData={data as GetSettingsProfileResponse} />
}
