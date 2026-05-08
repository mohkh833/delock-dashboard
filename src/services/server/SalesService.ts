/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import {
    productsData,
    rangeData,
    ordersData,
    orderDetailsData,
} from '@/mock/data/salesData'
import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'
import sleep from '@/utils/sleep'

export async function getSalesProductList(params: {
    pageIndex?: number | string
    pageSize?: number | string
    sortOrder?: string
    sortKey?: string
    query?: string
}) {
    const { pageIndex = 1, pageSize = 10, sortOrder, sortKey, query } = params

    let data = [...productsData] as any[]
    let total = data.length

    const prices = data.map((product) => product.price)

    const lowestPrice = Math.min(...prices)
    const highestPrice = Math.max(...prices)

    if (sortKey && sortOrder) {
        if (sortKey === 'category' || sortKey === 'name') {
            data.sort(
                sortBy(sortKey, sortOrder === 'desc', (a) =>
                    (a as string).toString().toUpperCase(),
                ),
            )
        } else {
            data.sort(sortBy(sortKey, sortOrder === 'desc', parseInt as Primer))
        }
    }

    if (query) {
        data = wildCardSearch(data, query, 'name')
        total = data.length
    }

    data = paginate(data, Number(pageSize), Number(pageIndex))

    await sleep(500)

    return {
        list: data,
        total: total,
        meta: {
            lowestPrice,
            highestPrice,
            rangeData,
        },
    }
}

export async function getSalesOrder(params: { id: string }) {
    const { id } = params
    const order = ordersData.find((order) => order.id === id)

    if (!order) {
        return {
            ...ordersData[0],
            ...orderDetailsData,
            products: productsData.slice(0, 1).map((product) => ({
                ...product,
                quantity: 1,
                total: product.price,
            })),
        }
    }

    const getOrderDetailsExtra = () => {
        const productsSize = (order as any).productCount || 1
        const products = productsData.slice(0, productsSize)
        const subTotal = products.reduce(
            (sum, product) => sum + product.price,
            0,
        )
        const total = subTotal + 105.72 + 15
        return {
            ...orderDetailsData,
            products: products.map((product) => ({
                ...product,
                quantity: 1,
                total: product.price,
            })),
            paymentSummary: {
                subTotal,
                tax: 105.72,
                deliveryFees: 15,
                total,
                customerPayment: total,
            },
        }
    }

    await sleep(300)

    return {
        ...order,
        ...getOrderDetailsExtra(),
    }
}
