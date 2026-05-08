'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Dropdown from '@/components/ui/Dropdown'
import { TbCloudDownload, TbUserPlus, TbDotsVertical } from 'react-icons/tb'
import dynamic from 'next/dynamic'

const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
    ssr: false,
})
import CreateCustomerDialog, {
    type Customer as DialogCustomer,
} from '@/components/view/CreateCustomerDialog/CreateCustomerDialog'
import { useCustomerListStore } from '../_store/customerListStore'

const CustomerListActionTools = () => {
    const data = useCustomerListStore((state) => state.data)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const handleCreateCustomer = (dialogCustomer: DialogCustomer) => {
        console.log('Create customer payload:', dialogCustomer)
        setIsDialogOpen(false)
    }

    const handleMenuSelect = (eventKey: string) => {
        if (eventKey === 'add') {
            setIsDialogOpen(true)
        }
    }

    return (
        <>
            <div className="hidden lg:flex gap-3">
                <CSVLink
                    className="w-full"
                    filename="customerList.csv"
                    data={data.list}
                >
                    <Button
                        icon={<TbCloudDownload className="text-xl" />}
                        className="w-full"
                    >
                        Export data
                    </Button>
                </CSVLink>
                <Button
                    variant="solid"
                    className="whitespace-nowrap"
                    icon={<TbUserPlus className="text-xl" />}
                    onClick={() => setIsDialogOpen(true)}
                >
                    Add new
                </Button>
            </div>
            <div className="lg:hidden">
                <Dropdown
                    renderTitle={<Button icon={<TbDotsVertical />} />}
                    placement="bottom-end"
                >
                    <Dropdown.Item eventKey="add" onSelect={handleMenuSelect}>
                        <div className="flex items-center gap-2">
                            <TbUserPlus className="text-xl" />
                            <span>Add new</span>
                        </div>
                    </Dropdown.Item>
                    <CSVLink filename="customerList.csv" data={data.list}>
                        <Dropdown.Item eventKey="export">
                            <div className="flex items-center gap-2">
                                <TbCloudDownload className="text-xl" />
                                <span>Export data</span>
                            </div>
                        </Dropdown.Item>
                    </CSVLink>
                </Dropdown>
            </div>
            <CreateCustomerDialog
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
                onCreate={handleCreateCustomer}
            />
        </>
    )
}

export default CustomerListActionTools
