'use client'

import Container from '@/components/shared/Container'
import CustomerListActionTools from './CustomerListActionTools'
import CutomerListStatistic from './CustomerListStatistic'
import CustomerListStatusTab from './CustomerListStatusTab'
import CustomersListTableTools from './CustomersListTableTools'
import CustomerListTable from './CustomerListTable'
import CustomerListProvider from './CustomerListProvider'
import type { GetCustomersListResponse, CustomerStatistic } from '../types'

const CustomerList = ({
    data,
    statisticData,
}: {
    data: GetCustomersListResponse
    statisticData: CustomerStatistic
}) => {
    return (
        <CustomerListProvider data={data}>
            <Container>
                <div className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-2">
                        <h4>Customers</h4>
                        <CustomerListActionTools />
                    </div>
                    <CutomerListStatistic data={statisticData} />
                    <CustomerListStatusTab />
                    <CustomersListTableTools />
                    <CustomerListTable />
                </div>
            </Container>
        </CustomerListProvider>
    )
}

export default CustomerList
