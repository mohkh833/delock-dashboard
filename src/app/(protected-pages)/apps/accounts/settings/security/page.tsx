import { getSettingsSecurity } from '@/server/actions/accounts'
import Security from './_components/Security'
import type { GetSecuritySettingsResponse } from '../types'

export default async function SecurityPage() {
    const data = await getSettingsSecurity()
    return (
        <Security
            initialData={data as unknown as GetSecuritySettingsResponse}
        />
    )
}
