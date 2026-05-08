'use client'

import { useMemo } from 'react'
import Avatar from '@/components/ui/Avatar'
import Tag from '@/components/ui/Tag'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import { getEventColors, getEventText } from '../utils'
import { useLeaveData } from '../_context/LeaveDataContext'
import classNames from '@/utils/classNames'
import type { ColumnDef } from '@tanstack/react-table'
import type { LeaveRequest } from '../types'

const LeavesTable = () => {
    const { leaveRequests } = useLeaveData()

    const leavesData = useMemo(() => {
        return leaveRequests.filter(
            (request) =>
                request.status === 'approved' || request.status === 'rejected',
        )
    }, [leaveRequests])

    const columns: ColumnDef<LeaveRequest>[] = useMemo(
        () => [
            {
                accessorKey: 'employee',
                header: 'Employee',
                cell: ({ row }) => {
                    const employee = row.original.employee
                    return (
                        <div className="flex items-center gap-3">
                            <Avatar
                                size={25}
                                shape="circle"
                                src={employee.avatar}
                                alt={employee.name}
                            />
                            <div className="text-nowrap">
                                <p className="font-medium heading-text">
                                    {employee.name}
                                </p>
                                <p>{employee.title}</p>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: 'type',
                header: 'Type',
                cell: ({ row }) => (
                    <Tag className="gap-1 bg-white dark:bg-gray-800">
                        <Badge
                            className={classNames(
                                getEventColors(row.original.type),
                                'h-2.5 w-2.5',
                            )}
                        />
                        {getEventText(row.original.type)}
                    </Tag>
                ),
            },
            {
                accessorKey: 'dates',
                header: 'Dates',
                cell: ({ row }) => {
                    const { startDate, endDate } = row.original
                    const start = new Date(startDate).toLocaleDateString(
                        'en-US',
                        {
                            month: 'short',
                            day: 'numeric',
                        },
                    )
                    const end = new Date(endDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    })

                    return (
                        <div>
                            <p className="font-medium">{start}</p>
                            {startDate !== endDate && <p>to {end}</p>}
                        </div>
                    )
                },
            },
            {
                accessorKey: 'duration',
                header: 'Duration',
                cell: ({ row }) => (
                    <span className="font-medium">{row.original.duration}</span>
                ),
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => {
                    const status =
                        row.original.status === 'approved'
                            ? {
                                  badgeColor: 'bg-success',
                                  textColor: 'text-success',
                                  text: 'Approved',
                              }
                            : {
                                  badgeColor: 'bg-error',
                                  textColor: 'text-error',
                                  text: 'Rejected',
                              }

                    return (
                        <span
                            className={classNames(
                                'flex items-center gap-1',
                                status.textColor,
                            )}
                        >
                            <Badge
                                className={classNames(
                                    status.badgeColor,
                                    'h-2.5 w-2.5',
                                )}
                            />
                            <span className="font-medium">{status.text}</span>
                        </span>
                    )
                },
            },
        ],
        [],
    )

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={leavesData}
                skeletonAvatarColumns={[0]}
            />
        </div>
    )
}

export default LeavesTable
