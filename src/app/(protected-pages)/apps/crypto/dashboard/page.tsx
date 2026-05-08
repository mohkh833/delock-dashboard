import { getCryptoDashboard } from '@/server/actions/crypto'
import CryptoDashboardClient from './_components/CryptoDashboardClient'
import type { CryptoDashboardData } from './types'

export default async function CryptoDashboardPage() {
    const data = await getCryptoDashboard()

    return <CryptoDashboardClient initialData={data as CryptoDashboardData} />
}
