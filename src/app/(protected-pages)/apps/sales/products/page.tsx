import { getSalesProductList } from '@/server/actions/sales'
import ProductList from './_components/ProductList'

export default async function ProductListPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams

    const pageIndex = Number(searchParams.pageIndex) || 1
    const pageSize = Number(searchParams.pageSize) || 10
    const sortKey = (searchParams.sortKey as string) || ''
    const sortOrder = (searchParams.sortOrder as string) || ''
    const query = (searchParams.query as string) || ''

    const initialData = await getSalesProductList({
        pageIndex,
        pageSize,
        sortKey,
        sortOrder,
        query,
    })

    return <ProductList data={initialData} />
}
