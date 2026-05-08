'use client'

import SpotTradingHeader from './SpotHeader'
import MarketList from './MarketList'
import SpotTradingChart from './SpotTradingChart'
import MarketTrade from './MarketTrade'
import OrderBook from './OrderBook'
import TradingPanel from './TradingPanel'
import OrdersPanel from './OrdersPanel'
import SpotMobileNav from './SpotMobileNav'
import SpotMarketDrawer from './SpotMarketDrawer'
import MobileTradingFooter from './MobileTradingFooter'
import MobileTradingDrawer from './MobileTradingDrawer'
import Loading from '@/components/shared/Loading'
import useResponsive from '@/utils/hooks/useResponsive'
import { useSpotTradingStore } from '../store/spotTradingStore'
import useSpotData from '../_hooks/useSpotData'
import useSpotOrders from '../_hooks/useSpotOrders'

const SpotTrading = () => {
    const { larger } = useResponsive()

    const isDesktop = larger.xl
    const isTablet = larger.lg && !larger.xl
    const mobileActiveTab = useSpotTradingStore(
        (state) => state.mobileActiveTab,
    )
    const isMarketDrawerOpen = useSpotTradingStore(
        (state) => state.isMarketDrawerOpen,
    )
    const setMarketDrawerOpen = useSpotTradingStore(
        (state) => state.setMarketDrawerOpen,
    )

    const isTradingDrawerOpen = useSpotTradingStore(
        (state) => state.isTradingDrawerOpen,
    )
    const tradingDrawerSide = useSpotTradingStore(
        (state) => state.tradingDrawerSide,
    )
    const openTradingDrawer = useSpotTradingStore(
        (state) => state.openTradingDrawer,
    )
    const closeTradingDrawer = useSpotTradingStore(
        (state) => state.closeTradingDrawer,
    )

    const { isLoading: isSpotDataLoading } = useSpotData()
    const { isLoading: isOrdersLoading } = useSpotOrders()

    if (isSpotDataLoading || isOrdersLoading) {
        return <Loading loading className="h-full"></Loading>
    }

    if (isDesktop) {
        return (
            <div className="flex flex-col">
                <SpotTradingHeader />
                <div className="flex border-b border-gray-200 dark:border-gray-800">
                    <div className="xl:w-[280px] 2xl:w-[350px] h-full ltr:border-r rtl:border-l border-gray-200 dark:border-gray-800 flex flex-col">
                        <MarketList />
                        <MarketTrade />
                    </div>
                    <div className="flex-1 flex flex-col h-full">
                        <SpotTradingChart />
                        <TradingPanel />
                    </div>
                    <div className="xl:min-w-[280px] 2xl:min-w-[400px] h-full ltr:border-l rtl:border-r border-gray-200 dark:border-gray-800 flex flex-col">
                        <OrderBook />
                    </div>
                </div>
                <OrdersPanel />
            </div>
        )
    }

    if (isTablet) {
        return (
            <div className="flex flex-col">
                <SpotTradingHeader
                    showDrawerToggle
                    onDrawerToggle={() =>
                        setMarketDrawerOpen(!isMarketDrawerOpen)
                    }
                    isDrawerOpen={isMarketDrawerOpen}
                />
                <SpotMarketDrawer
                    isOpen={isMarketDrawerOpen}
                    onClose={() => setMarketDrawerOpen(false)}
                />
                <div className="flex border-b border-gray-200 dark:border-gray-800">
                    <div className="flex-1 flex flex-col h-full">
                        <SpotTradingChart />
                        <TradingPanel />
                    </div>
                    <div className="min-w-[280px] max-w-[350px] h-full border-l border-gray-200 dark:border-gray-800 flex flex-col">
                        <OrderBook />
                    </div>
                </div>
                <OrdersPanel />
            </div>
        )
    }

    return (
        <div className="flex flex-col pb-16">
            <SpotTradingHeader layout="mobile" />
            <SpotMobileNav />
            <div className="flex-1">
                {mobileActiveTab === 'chart' && <SpotTradingChart />}
                {mobileActiveTab === 'book' && <OrderBook maxRows={10} />}
            </div>
            <OrdersPanel />
            <MobileTradingFooter onTradeClick={openTradingDrawer} />
            <MobileTradingDrawer
                isOpen={isTradingDrawerOpen}
                side={tradingDrawerSide}
                onClose={closeTradingDrawer}
            />
        </div>
    )
}

export default SpotTrading
