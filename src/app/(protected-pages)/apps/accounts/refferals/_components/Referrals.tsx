'use client'

import Card from '@/components/ui/Card'
import Container from '@/components/shared/Container'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { apiSendInvitation } from '@/services/client/AccountService'
import DataContext from './DataContext'
import ReferralHeader from './ReferralHeader'
import ReferralProcess from './ReferralProcess'
import ReferralTools from './ReferralTools'
import InviteFriends from './InviteFriends'
import ReferralStats from './ReferralStats'
import ReferralHistory from './ReferralHistory'
import type {
    ReferralData,
    SendInvitationRequest,
    SendInvitationResponse,
} from '../types'

type ReferralsProps = {
    initialData: ReferralData
}

const Referrals = ({ initialData }: ReferralsProps) => {
    const sendInvitation = async (email: string) => {
        try {
            const response = await apiSendInvitation<
                SendInvitationResponse,
                SendInvitationRequest
            >({ email })

            if (response.success) {
                toast.push(
                    <Notification type="success" title="Invitation Sent">
                        {response.message}
                    </Notification>,
                )
            } else {
                toast.push(
                    <Notification
                        type="danger"
                        title="Failed to Send Invitation"
                    >
                        {response.message}
                    </Notification>,
                )
            }
        } catch {
            toast.push(
                <Notification type="danger" title="Error">
                    Failed to send invitation. Please try again.
                </Notification>,
            )
            throw new Error('Failed to send invitation')
        }
    }

    const copyToClipboard = async (text: string, type: 'link' | 'code') => {
        try {
            await navigator.clipboard.writeText(text)
            const typeLabel =
                type === 'link' ? 'Referral Link' : 'Referral Code'
            toast.push(
                <Notification type="success" title="Copied to Clipboard">
                    {typeLabel} copied successfully!
                </Notification>,
            )
        } catch {
            toast.push(
                <Notification type="danger" title="Copy Failed">
                    Unable to copy to clipboard. Please try again.
                </Notification>,
            )
            throw new Error('Failed to copy to clipboard')
        }
    }

    return (
        <DataContext.Provider
            value={{ data: initialData, sendInvitation, copyToClipboard }}
        >
            <Container size="md">
                <div className="space-y-8">
                    <ReferralHeader />
                    <ReferralProcess />
                    <Card bodyClass="py-6 px-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x divide-y lg:divide-y-0 divide-gray-200 dark:divide-gray-800">
                            <div className="pb-6 lg:pb-0">
                                <ReferralTools />
                            </div>
                            <div className="pt-6 lg:pt-0">
                                <InviteFriends />
                            </div>
                        </div>
                    </Card>
                    <ReferralStats />
                    <ReferralHistory />
                </div>
            </Container>
        </DataContext.Provider>
    )
}

export default Referrals
