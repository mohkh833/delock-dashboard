'use client'
import Button from '@/components/ui/Button'
import Container from '@/components/shared/Container'
import IconFrame from '@/components/shared/IconFrame'
import { useRouter } from 'next/navigation'
import { LiBoxAdd, LiAdd } from '@/icons'

import type { FormMode } from '../types'
type OrderDetailsHeaderProps = {
    data?: {
        id: string
    }
    mode: FormMode
}

const OrderDetailsHeader = ({ mode, data }: OrderDetailsHeaderProps) => {
    const router = useRouter()

    return (
        <div className="py-4 border-b border-gray-200 dark:border-gray-800">
            <Container size="md" className="px-4">
                <div className="flex items-center justify-between gap-4">
                    {mode === 'create' && (
                        <div className="flex items-center gap-4">
                            <IconFrame variant="layered">
                                <LiBoxAdd className="text-xl heading-text" />
                            </IconFrame>
                            <div>
                                <h5 className="font-semibold">Add new order</h5>
                                <span>Add new order to the system</span>
                            </div>
                        </div>
                    )}

                    {mode === 'edit' && (
                        <div className="flex items-center gap-4">
                            <IconFrame variant="layered">
                                <LiBoxAdd className="text-xl heading-text" />
                            </IconFrame>
                            <div>
                                <h5 className="font-semibold">
                                    Edit Order{' '}
                                    {data?.id
                                        ? `#${data.id.slice(-8).toUpperCase()}`
                                        : ''}
                                </h5>
                                <span>Modify existing order details</span>
                            </div>
                        </div>
                    )}
                    <Button
                        className="sm:hidden"
                        icon={<LiAdd />}
                        onClick={() => router.push('/apps/accounts/invoice')}
                    />
                    <Button
                        className="hidden sm:flex"
                        icon={<LiAdd />}
                        onClick={() => router.push('/apps/accounts/invoice')}
                    >
                        Create Invoice
                    </Button>
                </div>
            </Container>
        </div>
    )
}

export default OrderDetailsHeader
