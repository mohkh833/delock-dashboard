'use client'
import Button from '@/components/ui/Button'
import { LiDownload } from '@/icons'
import dynamic from 'next/dynamic'
import { useProductListStore } from '../_store/productListStore'

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})

const ProductListExport = () => {
    const data = useProductListStore((state) => state.data)

    const csvLinkProps = {
        filename: 'products.csv',
        data: data?.list || [],
    }

    return (
        <>
            <CSVLink className="sm:hidden" {...csvLinkProps}>
                <Button icon={<LiDownload />} />
            </CSVLink>
            <CSVLink className="hidden sm:block" {...csvLinkProps}>
                <Button icon={<LiDownload />}>Export</Button>
            </CSVLink>
        </>
    )
}

export default ProductListExport
