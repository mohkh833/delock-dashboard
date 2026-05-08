import { getReferralData } from '@/server/actions/accounts'
import Referrals from './_components/Referrals'

export default async function ReferralsPage() {
    const data = await getReferralData()
    return <Referrals initialData={data} />
}
