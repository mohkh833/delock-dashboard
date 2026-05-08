/* eslint-disable @typescript-eslint/no-explicit-any */
'use server'
import {
    generateCompleteDashboardData,
    productsData,
    productDetailsData,
    ordersData,
    orderStatisticsData,
} from '@/mock/data/salesData'
import {
    getSalesProductList as getSalesProductListService,
    getSalesOrder as getSalesOrderService,
} from '@/services/server/SalesService'
import wildCardSearch from '@/utils/wildCardSearch'
import sortBy, { Primer } from '@/utils/sortBy'
import paginate from '@/utils/paginate'

export async function getSalesDashboardData(params: any) {
    const {
        startDate,
        endDate,
        comparisonStartDate,
        comparisonEndDate,
        timeRange,
        comparisonPeriod,
    } = params
    const data = generateCompleteDashboardData(
        startDate,
        endDate,
        comparisonStartDate,
        comparisonEndDate,
        timeRange,
        comparisonPeriod,
    )

    return data
}

export async function getSalesProductList(params: any) {
    return getSalesProductListService(params)
}

export async function getSalesProduct(params: { id: string }) {
    const product = productsData.find((product) => product.id === params.id)
    if (!product) return null
    return { ...product, ...productDetailsData }
}

export async function getSalesOrderList(params: any) {
    const {
        pageIndex = 1,
        pageSize = 10,
        query,
        sortKey,
        sortOrder,
        paymentStatus,
    } = params

    const orders = ordersData as any[]
    let data = orders
    let total = data.length

    if (paymentStatus) {
        data = data.filter((order) => order.paymentStatus === paymentStatus)
        total = data.length
    }

    if (sortKey && sortOrder) {
        if (
            sortKey === 'status' ||
            sortKey === 'orderId' ||
            sortKey === 'customer' ||
            sortKey === 'paymentStatus'
        ) {
            data.sort(
                sortBy(sortKey, sortOrder === 'desc', (a) =>
                    (a as string).toUpperCase(),
                ),
            )
        } else {
            data.sort(sortBy(sortKey, sortOrder === 'desc', parseInt as Primer))
        }
    }

    if (query) {
        data = wildCardSearch(data, query, 'id')
        total = data.length
    }

    data = paginate(data, Number(pageSize), Number(pageIndex))

    return {
        list: data,
        total: total,
    }
}

export async function getSalesOrderStatistics() {
    return orderStatisticsData
}

export async function getSalesOrder(params: { id: string }) {
    return getSalesOrderService(params)
}
