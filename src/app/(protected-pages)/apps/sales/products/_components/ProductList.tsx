'use client'

import Container from '@/components/shared/Container'
import ProductListHeader from './ProductListHeader'
import ProductListTableTools from './ProductListTableTools'
import ProductListTable from './ProductListTable'
import ProductListSelected from './ProductListSelected'
import QuickEdit from './QuickEdit'
import ProductListProvider from './ProductListProvider'
import type { GetProductListResponse } from '../types'

const Products = ({ data }: { data: GetProductListResponse }) => {
    return (
        <ProductListProvider data={data}>
            <ProductListHeader />
            <Container className="p-4">
                <div className="flex flex-col gap-4">
                    <ProductListTableTools />
                    <ProductListTable />
                </div>
            </Container>
            <QuickEdit />
            <ProductListSelected />
        </ProductListProvider>
    )
}

export default Products
