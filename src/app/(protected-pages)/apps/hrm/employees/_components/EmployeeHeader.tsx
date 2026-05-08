'use client'

import Button from '@/components/ui/Button'
import Tabs from '@/components/ui/Tabs'
import Container from '@/components/shared/Container'
import { useSearchParams } from 'next/navigation'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'

const EmployeeHeader = () => {
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const status = searchParams.get('status') || 'active'

    const handleStatusChange = (value: string) => {
        appendQueryParams({ status: value, pageIndex: 1 })
    }

    return (
        <div className="border-b border-gray-200 dark:border-gray-800 mb-4">
            <Container className="px-4">
                <div className="flex flex-col gap-4">
                    <div className="flex justify-between">
                        <div>
                            <h4>Employees</h4>
                            <p className="text-sm mt-1">List of employees</p>
                        </div>
                        <Button onClick={() => {}}>Export</Button>
                    </div>
                    <div className="-mb-[1px]">
                        <Tabs value={status} onChange={handleStatusChange}>
                            <Tabs.TabList className="dark:border-gray-800">
                                <Tabs.TabNav value="active">Active</Tabs.TabNav>
                                <Tabs.TabNav value="inactive">
                                    Inactive
                                </Tabs.TabNav>
                                <Tabs.TabNav value="terminated">
                                    Terminated
                                </Tabs.TabNav>
                            </Tabs.TabList>
                        </Tabs>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default EmployeeHeader
