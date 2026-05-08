import OrderDetails from '@/components/view/OrderDetails'
import { getSalesOrder } from '@/server/actions/sales'
import type { Order } from '@/components/view/OrderDetails/types'

export default async function EditProductPage(props: {
    params: Promise<{ productId: string }>
}) {
    const params = await props.params
    const order = await getSalesOrder({ id: params.productId })

    return <OrderDetails data={order as unknown as Order} />
}
