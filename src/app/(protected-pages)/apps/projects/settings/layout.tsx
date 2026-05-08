import SettingsMenu from './_components/SettingsMenu'
import Container from '@/components/shared/Container'
import type { ReactNode } from 'react'

export default function SettingsLayout({ children }: { children: ReactNode }) {
    return (
        <Container size="md">
            <div className="flex gap-2">
                <div className="hidden lg:block">
                    <SettingsMenu />
                </div>
                <div className="pb-4 md:px-4 max-w-225 mx-auto flex-1">
                    {children}
                </div>
            </div>
        </Container>
    )
}
