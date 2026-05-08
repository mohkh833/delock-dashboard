import ProductListSearch from './ProductListSearch'
import ProductListFilter from './ProductListFilter'
import ProductListExport from './ProductListExport'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const ProductListTableTools = () => {
    const appendQueryParams = useAppendQueryParams()

    const handleInputChange = (val: string) => {
        appendQueryParams({ query: val, pageIndex: '1' })
    }

    return (
        <div className="flex items-center sm:justify-between gap-2">
            <div className="flex-1 sm:flex-none">
                <ProductListSearch onInputChange={handleInputChange} />
            </div>
            <div className="flex items-center gap-2">
                <div>
                    <ProductListFilter />
                </div>
                <div>
                    <ProductListExport />
                </div>
            </div>
        </div>
    )
}

export default ProductListTableTools
