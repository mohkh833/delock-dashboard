'use client'

import { useState, useCallback, useContext, useMemo } from 'react'
import { apiGetProjectMembers } from '@/services/client/ProjectService'
import useSWR from 'swr'
import Scroll from '@/components/ui/Scroll'
import Segment from '@/components/ui/Segment'
import KeywordFilter from './KeywordFilter'
import MemberFilter from './MemberFilter'
import { DataContext } from './ActivityLog'
import type { TabValue, Member } from '../types'

type ProjectMembersResponse = {
    allMembers: {
        id: string
        name: string
        firstName: string
        lastName: string
        email: string
        img: string
    }[]
}

const FilterPanel = () => {
    const { filter, onFilterChange } = useContext(DataContext)

    const { data: membersData, isLoading: membersLoading } = useSWR(
        '/activity/members',
        () => apiGetProjectMembers<ProjectMembersResponse>(),
    )

    const members: Member[] = useMemo(() => {
        if (!membersData?.allMembers) return []
        return membersData.allMembers.map((member) => ({
            ...member,
            // eslint-disable-next-line react-hooks/purity
            activityCount: Math.floor(Math.random() * 1000) + 1,
        }))
    }, [membersData])

    const [filterState, setFilterState] = useState({
        activeTab: 'keywords' as TabValue,
        selectedMembers: filter.members || ([] as string[]),
        selectedKeyword: filter.keyword || (null as string | null),
        customKeywords: [] as string[],
    })

    const handleTabChange = useCallback((tab: TabValue) => {
        setFilterState((prev) => ({ ...prev, activeTab: tab }))
    }, [])

    const handleKeywordSelect = useCallback(
        (keyword: string | null) => {
            setFilterState((prev) => ({ ...prev, selectedKeyword: keyword }))
            onFilterChange({ ...filter, keyword })
        },
        [filter, onFilterChange],
    )

    const handleMemberToggle = useCallback(
        (memberId: string) => {
            const currentMembers = filterState.selectedMembers
            const newMembers = currentMembers.includes(memberId)
                ? currentMembers.filter((id) => id !== memberId)
                : [...currentMembers, memberId]

            setFilterState((prev) => ({ ...prev, selectedMembers: newMembers }))
            onFilterChange({
                ...filter,
                members: newMembers.length > 0 ? newMembers : undefined,
            })
        },
        [filterState.selectedMembers, filter, onFilterChange],
    )

    const handleSelectAll = useCallback(() => {
        const allMemberIds = members.map((member) => member.id)
        setFilterState((prev) => ({
            ...prev,
            selectedMembers: allMemberIds,
        }))
        onFilterChange({ ...filter, members: allMemberIds })
    }, [members, filter, onFilterChange])

    const handleClearAll = useCallback(() => {
        setFilterState((prev) => ({ ...prev, selectedMembers: [] }))
        onFilterChange({ ...filter, members: undefined })
    }, [filter, onFilterChange])

    return (
        <>
            <div className="p-4">
                <h5 className="text-lg font-semibold mb-4">Filters by</h5>
                <Segment
                    value={filterState.activeTab}
                    onChange={(val) => handleTabChange(val as TabValue)}
                    className="w-full"
                >
                    <Segment.Item value="keywords">Keywords</Segment.Item>
                    <Segment.Item value="members">Members</Segment.Item>
                </Segment>
            </div>
            <div className="absolute w-full h-[calc(100%-120px)]">
                <Scroll className="h-full" scrollbars="vertical">
                    {filterState.activeTab === 'keywords' ? (
                        <KeywordFilter
                            selectedKeyword={filterState.selectedKeyword}
                            onKeywordSelect={handleKeywordSelect}
                        />
                    ) : (
                        <MemberFilter
                            members={members}
                            membersLoading={membersLoading}
                            selectedMembers={filterState.selectedMembers}
                            onMemberToggle={handleMemberToggle}
                            onSelectAll={handleSelectAll}
                            onClearAll={handleClearAll}
                        />
                    )}
                </Scroll>
            </div>
        </>
    )
}

export default FilterPanel
