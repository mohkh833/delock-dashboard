'use client'

import { useState, useMemo, useCallback, createContext } from 'react'
import classNames from '@/components/ui/utils/classNames'
import useTheme from '@/utils/hooks/useTheme'
import {
    LAYOUT_INSET_SHELL,
    LAYOUT_STACKED_SIDE,
    LAYOUT_SEAMLESS_SIDE,
} from '@/constants/theme.constant'
import { apiGetActivityLogs } from '@/services/client/AccountService'
import useSWR from 'swr'
import FilterPanel from './FilterPanel'
import ContentZone from './ContentZone'
import type { ReactNode } from 'react'
import type { Activities, Filter, GetActivityLogResponse } from '../types'

type DataContextType = {
    data: Activities
    isLoading: boolean
    loadable: boolean
    activityIndex: number
    filter: Filter
    onLoadMore: () => void
    onFilterChange: (filter: Filter) => void
}

export const DataContext = createContext<DataContextType>({
    data: [],
    isLoading: false,
    loadable: true,
    activityIndex: 1,
    filter: {},
    onLoadMore: () => {},
    onFilterChange: () => {},
})

type ActivityContextProps = {
    children: ReactNode
    initialList: Activities
    initialLoadable: boolean
}

const ActivityContext = ({
    children,
    initialList,
    initialLoadable,
}: ActivityContextProps) => {
    const [filter, setFilter] = useState<Filter>({})
    const [activities, setActivities] = useState<Record<number, Activities>>({
        1: initialList,
    })
    const [loadable, setLoadable] = useState(initialLoadable)
    const [activityIndex, setActivityIndex] = useState(1)
    const [everInteracted, setEverInteracted] = useState(false)

    const resetActivitiesOnFilterChange = useCallback(() => {
        setActivities({})
        setActivityIndex(1)
    }, [])

    const { isLoading } = useSWR(
        everInteracted
            ? [
                  `/api/activity-logs?activityIndex=${activityIndex}&filter=${JSON.stringify(filter)}`,
              ]
            : null,
        () =>
            apiGetActivityLogs<GetActivityLogResponse, Record<string, unknown>>(
                {
                    filter,
                    activityIndex,
                },
            ),
        {
            revalidateOnFocus: false,
            onSuccess: (data) => {
                if (data) {
                    setActivities((prev) => ({
                        ...prev,
                        [activityIndex]: data.list,
                    }))
                    setLoadable(data.loadable)
                }
            },
        },
    )

    const data = useMemo(() => {
        return Object.entries(activities)
            .map(([, value]) => value)
            .flatMap((item) => item)
    }, [activities])

    const handleLoadMore = useCallback(() => {
        setEverInteracted(true)
        setActivityIndex((prev) => prev + 1)
    }, [])

    const handleFilterChange = useCallback(
        (newFilter: Filter) => {
            setFilter(newFilter)
            setEverInteracted(true)
            resetActivitiesOnFilterChange()
        },
        [resetActivitiesOnFilterChange],
    )

    return (
        <DataContext.Provider
            value={{
                data: data.length > 0 ? data : [],
                isLoading,
                loadable,
                activityIndex,
                filter,
                onLoadMore: handleLoadMore,
                onFilterChange: handleFilterChange,
            }}
        >
            {children}
        </DataContext.Provider>
    )
}

type ActivityLogProps = {
    initialData: GetActivityLogResponse
}

const ActivityLog = ({ initialData }: ActivityLogProps) => {
    const layout = useTheme((s) => s.layout)

    return (
        <ActivityContext
            initialList={initialData.list}
            initialLoadable={initialData.loadable}
        >
            <div
                className={classNames(
                    'h-full',
                    [
                        LAYOUT_INSET_SHELL,
                        LAYOUT_STACKED_SIDE,
                        LAYOUT_SEAMLESS_SIDE,
                    ].includes(layout.type) &&
                        'border-t border-gray-200 dark:border-gray-800',
                )}
            >
                <div className="flex flex-auto h-full">
                    <div className="hidden xl:block relative flex-1 xl:max-w-70 ltr:border-r rtl:border-l border-gray-200 dark:border-gray-800">
                        <FilterPanel />
                    </div>
                    <ContentZone />
                </div>
            </div>
        </ActivityContext>
    )
}

export default ActivityLog
