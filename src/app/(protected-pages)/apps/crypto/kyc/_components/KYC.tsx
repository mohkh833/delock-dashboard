'use client'

import { useKYCStore } from '../_store/kycStore'
import AccountTypeSelection from './AccountTypeSelection'
import KYCWizard from './KYCWizard'
import SuccessView from './SuccessView'

const KYC = () => {
    const { isWizardActive, submissionStatus } = useKYCStore()

    if (submissionStatus === 'success') {
        return <SuccessView />
    }

    if (isWizardActive) {
        return <KYCWizard />
    }

    return <AccountTypeSelection />
}

export default KYC
