'use client'

import Card from '@/components/ui/Card'
import Segment from '@/components/ui/Segment'
import { useAssetsStore } from '../store/assetsStore'
import AssetsTable from './AssetsTable'
import TransactionsTable from './TransactionsTable'
import TradeHistoryTable from './TradeHistoryTable'

const AssetsContent = () => {
    const activeTab = useAssetsStore((state) => state.activeTab)
    const setActiveTab = useAssetsStore((state) => state.setActiveTab)

    const tabOptions = [
        { value: 'assets', label: 'Assets' },
        { value: 'transactions', label: 'Transactions' },
        {
            value: 'trades',
            label: (
                <>
                    <span className="hidden md:inline">Trade History</span>
                    <span className="md:hidden">History</span>
                </>
            ),
        },
    ]

    const renderTabContent = () => {
        switch (activeTab) {
            case 'assets':
                return <AssetsTable />
            case 'transactions':
                return <TransactionsTable />
            case 'trades':
                return <TradeHistoryTable />
            default:
                return <AssetsTable />
        }
    }

    return (
        <Card>
            <div className="flex flex-col gap-4">
                <div className="w-full md:w-auto">
                    <Segment
                        value={activeTab}
                        onChange={(value) =>
                            setActiveTab(
                                value as 'assets' | 'transactions' | 'trades',
                            )
                        }
                        className="w-full md:w-auto"
                    >
                        {tabOptions.map((option) => (
                            <Segment.Item
                                key={option.value}
                                value={option.value}
                                className="px-2 md:px-4"
                            >
                                {option.label}
                            </Segment.Item>
                        ))}
                    </Segment>
                </div>
                <div>{renderTabContent()}</div>
            </div>
        </Card>
    )
}

export default AssetsContent
