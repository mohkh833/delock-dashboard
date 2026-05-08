import {
    getCustomersList,
    getCustomerStatistics,
} from '@/server/actions/customers'
import CustomerList from './_components/CustomerList'

export default async function CustomerListPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams

    const pageIndex = Number(searchParams.pageIndex) || 1
    const pageSize = Number(searchParams.pageSize) || 10
    const sortKey = (searchParams.sortKey as string) || ''
    const sortOrder = (searchParams.sortOrder as string) || ''
    const query = (searchParams.query as string) || ''
    const status = (searchParams.status as string) || ''
    const customerLabel = (searchParams.customerLabel as string) || ''
    const dateRange = (searchParams.dateRange as string) || ''

    const [initialData, statisticData] = await Promise.all([
        getCustomersList({
            pageIndex,
            pageSize,
            sortKey,
            sortOrder,
            query,
            status,
            customerLabel,
            dateRange,
        }),
        getCustomerStatistics(),
    ])

    return <CustomerList data={initialData} statisticData={statisticData} />
}
