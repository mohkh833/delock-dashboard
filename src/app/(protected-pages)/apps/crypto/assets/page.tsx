import { getCryptoAssetsInitialData } from '@/server/actions/crypto'
import Container from '@/components/shared/Container'
import AssetsHeader from './_components/AssetsHeader'
import PortfolioOverview from './_components/PortfolioOverview'
import AssetsContent from './_components/AssetsContent'
import DepositDialog from './_components/DepositDialog'
import WithdrawDialog from './_components/WithdrawDialog'
import type { AssetsInitialData } from './types'

export default async function CryptoAssetsPage() {
    const initialData = await getCryptoAssetsInitialData()

    return (
        <Container>
            <div className="flex flex-col gap-4">
                <AssetsHeader />
                <PortfolioOverview
                    initialData={initialData as AssetsInitialData}
                />
                <AssetsContent />
            </div>
            <DepositDialog />
            <WithdrawDialog />
        </Container>
    )
}
