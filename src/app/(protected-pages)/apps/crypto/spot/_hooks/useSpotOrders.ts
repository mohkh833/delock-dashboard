import useSWR from 'swr'
import { apiGetOpenOrders } from '@/services/client/CryptoService'
import type { OpenOrder } from '../_components/types'

const useSpotOrders = () => {
    const {
        data: openOrdersData,
        isLoading,
        error,
        mutate,
    } = useSWR(
        '/api/crypto/spot/orders/open',
        () => apiGetOpenOrders<{ orders: OpenOrder[] }>(),
        {
            revalidateOnFocus: false,
            errorRetryCount: 3,
            errorRetryInterval: 2000,
        },
    )

    const openOrders = openOrdersData?.orders || []

    return {
        openOrders,
        isLoading,
        error,
        mutate,
    }
}

export default useSpotOrders
