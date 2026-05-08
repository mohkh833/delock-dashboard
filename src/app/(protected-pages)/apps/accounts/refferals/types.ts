export type ReferralUser = {
    id: string
    name: string
    email: string
    img?: string
    signupDate: string
    status: 'pending' | 'completed' | 'expired'
}

export type ReferralStats = {
    invitationsSent: number
    signupsViaLink: number
    conversionRate: number
    rewardsEarned: {
        amount: number
        currency: string
        type: 'cash' | 'credits' | 'discount'
    }
}

export type ReferralActivity = {
    id: string
    referredUser: ReferralUser
    signupDate: string
    reward: {
        amount: number
        currency: string
        type: 'cash' | 'credits' | 'discount'
    }
    status: 'pending' | 'completed'
}

export type ReferralData = {
    referralLink: string
    referralCode: string
    stats: ReferralStats
    history: ReferralActivity[]
    totalHistoryCount: number
}

export type SendInvitationRequest = {
    email: string
}

export type SendInvitationResponse = {
    success: boolean
    message: string
}
