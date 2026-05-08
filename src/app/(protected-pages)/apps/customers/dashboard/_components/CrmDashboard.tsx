'use client'

import { useState } from 'react'
import Drawer from '@/components/ui/Drawer'
import Button from '@/components/ui/Button'
import Container from '@/components/shared/Container'
import { LiSetting4 } from '@/icons'
import CrmDashboardContent from './CrmDashboardContent'
import ConfigurationPanel from './ConfigurationPanel'
import type { CrmDashboardData, DashboardFilters } from '../types'

type Props = {
    data: CrmDashboardData
    filters: DashboardFilters
}

const CrmDashboard = ({ data, filters }: Props) => {
    const [isConfigDrawerOpen, setIsConfigDrawerOpen] = useState(false)

    return (
        <div className="h-full">
            <Container className="h-full p-4">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h4>CRM Dashboard</h4>
                        <p>Real-time insights into sales and summary</p>
                    </div>
                    {/* Desktop: label + icon */}
                    <div className="hidden lg:block">
                        <Button
                            icon={<LiSetting4 />}
                            onClick={() => setIsConfigDrawerOpen(true)}
                        >
                            Configure
                        </Button>
                    </div>
                    {/* Mobile: icon only */}
                    <div className="block lg:hidden">
                        <Button
                            icon={<LiSetting4 />}
                            onClick={() => setIsConfigDrawerOpen(true)}
                        />
                    </div>
                </div>
                <CrmDashboardContent data={data} filters={filters} />
            </Container>

            <Drawer
                title="Configuration"
                isOpen={isConfigDrawerOpen}
                onClose={() => setIsConfigDrawerOpen(false)}
                placement="right"
                bodyClass="p-0"
            >
                <ConfigurationPanel filters={filters} />
            </Drawer>
        </div>
    )
}

export default CrmDashboard
