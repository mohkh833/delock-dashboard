import ProductDetails from '@/components/view/ProductDetails'
import { getSalesProduct } from '@/server/actions/sales'
import type { Product } from '@/components/view/ProductDetails/types'

export default async function EditProductPage(props: {
    params: Promise<{ productId: string }>
}) {
    const params = await props.params
    const product = await getSalesProduct({ id: params.productId })

    return <ProductDetails data={product as Product} />
}
