import { getLandingContent } from '@/server/actions/landing'
import LandingClient from './_components/LandingClient'
import type { LandingPageContent } from './types'

export default async function LandingPage() {
    const content = await getLandingContent()
    return <LandingClient content={content as LandingPageContent} />
}
