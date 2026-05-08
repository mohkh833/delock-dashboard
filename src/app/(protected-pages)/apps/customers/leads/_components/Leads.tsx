'use client'

import LeadListHeader from './LeadListHeader'
import LeadsTypeTab from './LeadsTypeTab'
import LeadsListTableTools from './LeadsListTableTools'
import LeadListTable from './LeadListTable'
import LeadsSelected from './LeadsSelected'
import LeadsProvider from './LeadsProvider'
import type { GetLeadsListResponse } from '../types'

const Leads = ({ data }: { data: GetLeadsListResponse }) => {
    return (
        <LeadsProvider data={data}>
            <LeadListHeader />
            <LeadsTypeTab />
            <LeadsListTableTools />
            <LeadListTable />
            <LeadsSelected />
        </LeadsProvider>
    )
}

export default Leads
