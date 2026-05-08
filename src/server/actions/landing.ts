'use server'

import { landingPageContent } from '@/mock/data/landingData'

export async function getLandingContent() {
    return landingPageContent
}
