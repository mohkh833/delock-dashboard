import SettingsTabNav from './_components/SettingsTabNav'
import Container from '@/components/shared/Container'
import type { ReactNode } from 'react'

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <div className="h-full">
            <SettingsTabNav />
            <Container size="md" className="p-4">
                {children}
            </Container>
        </div>
    )
}
