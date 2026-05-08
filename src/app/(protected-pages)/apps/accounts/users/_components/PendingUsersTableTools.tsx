'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Input from '@/components/ui/Input'
import Button from '@/components/ui/Button'
import PopoverFilter from '@/components/shared/PopoverFilter'
import { roleOptions } from '../utils'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useAccessControlStore } from '../store/accessControlStore'
import { LiSearch, LiSetting4 } from '@/icons'

const PendingUsersTableTools = () => {
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()
    const setEverInteracted = useAccessControlStore((s) => s.setEverInteracted)

    const queryParam = searchParams.get('query') || ''
    const requestedRoleParam = searchParams.get('requestedRole') || ''

    const [searchQuery, setSearchQuery] = useState(queryParam)
    const [selectedRoles, setSelectedRoles] = useState<string[]>(
        requestedRoleParam ? requestedRoleParam.split(',').filter(Boolean) : [],
    )

    useEffect(() => {
        setSearchQuery(queryParam)
        setSelectedRoles(
            requestedRoleParam
                ? requestedRoleParam.split(',').filter(Boolean)
                : [],
        )
    }, [queryParam, requestedRoleParam])

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value
        setSearchQuery(value)
        setEverInteracted(true)
        appendQueryParams({ query: value, pageIndex: 1 })
    }

    const handleRoleFilterChange = (
        selectedRoleData: Array<{ label: string; value: string }>,
    ) => {
        const roleValues = selectedRoleData.map((item) => item.value)
        setSelectedRoles(roleValues)
        setEverInteracted(true)
        appendQueryParams({
            requestedRole:
                roleValues.length > 0 ? roleValues.join(',') : undefined,
            pageIndex: 1,
        })
    }

    return (
        <div className="flex flex-col gap-4 px-4 sm:flex-row sm:items-center sm:justify-between">
            <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={handleSearchChange}
                prefix={<LiSearch className="text-base" />}
                className="w-full sm:max-w-[250px]"
            />
            <div className="flex items-center gap-2 justify-between sm:justify-end">
                <PopoverFilter
                    data={roleOptions}
                    value={selectedRoles}
                    onChange={handleRoleFilterChange}
                    title="Filter by Requested Role"
                    inputPlaceholder="Search roles..."
                    placement="bottom-start"
                    renderTrigger={
                        <Button className="relative" icon={<LiSetting4 />}>
                            <span className="flex items-center gap-1">
                                {selectedRoles.length > 0 ? (
                                    <span>Selected: </span>
                                ) : (
                                    <span>Filter by Role</span>
                                )}

                                {selectedRoles.length > 0 && (
                                    <span className="p-0.25 bg-primary text-white text-xs rounded w-4 h-4 flex items-center justify-center font-medium">
                                        {selectedRoles.length}
                                    </span>
                                )}
                            </span>
                        </Button>
                    }
                />
            </div>
        </div>
    )
}

export default PendingUsersTableTools
