'use client'

import { createContext, useContext } from 'react'
import type { ReferralData } from '../types'

type DataContextProps = {
    data: ReferralData
    sendInvitation: (email: string) => Promise<void>
    copyToClipboard: (text: string, type: 'link' | 'code') => Promise<void>
}

const DataContext = createContext<DataContextProps | null>(null)

export function useReferralData() {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error(
            'useReferralData must be used within Referrals provider',
        )
    }
    return context
}

export default DataContext
