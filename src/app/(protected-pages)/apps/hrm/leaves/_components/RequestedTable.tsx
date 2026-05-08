'use client'

import { useMemo, useState, useCallback } from 'react'
import Avatar from '@/components/ui/Avatar'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Badge from '@/components/ui/Badge'
import DataTable from '@/components/shared/DataTable'
import toast from '@/components/ui/toast'
import Notification from '@/components/ui/Notification'
import { LiCrossCircle, LiTickCircle } from '@/icons'
import { getEventColors, getEventText } from '../utils'
import { useLeaveData } from '../_context/LeaveDataContext'
import dayjs from 'dayjs'
import classNames from '@/utils/classNames'
import sleep from '@/utils/sleep'
import type { ColumnDef } from '@tanstack/react-table'
import type { LeaveRequest } from '../types'

const RequestedTable = () => {
    const { leaveRequests, updateLeaveRequestStatus } = useLeaveData()
    const [actionLoading, setActionLoading] = useState<{
        id: string
        action: 'approve' | 'reject'
    } | null>(null)

    const requestedData = useMemo(() => {
        return leaveRequests.filter((request) => request.status === 'pending')
    }, [leaveRequests])

    const handleApprove = useCallback(
        async (id: string) => {
            setActionLoading({ id, action: 'approve' })
            await sleep(500)
            try {
                updateLeaveRequestStatus(id, 'approved')
                toast.push(
                    <Notification type="success" title="Success">
                        Leave request approved successfully
                    </Notification>,
                )
            } catch {
                toast.push(
                    <Notification type="danger" title="Error">
                        Failed to approve leave request
                    </Notification>,
                )
            } finally {
                setActionLoading(null)
            }
        },
        [updateLeaveRequestStatus],
    )

    const handleReject = useCallback(
        async (id: string) => {
            setActionLoading({ id, action: 'reject' })
            await sleep(500)
            try {
                updateLeaveRequestStatus(id, 'rejected')
                toast.push(
                    <Notification type="success" title="Success">
                        Leave request rejected successfully
                    </Notification>,
                )
            } catch {
                toast.push(
                    <Notification type="danger" title="Error">
                        Failed to reject leave request
                    </Notification>,
                )
            } finally {
                setActionLoading(null)
            }
        },
        [updateLeaveRequestStatus],
    )

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
                    const start = dayjs(startDate).format('MMM DD')
                    const end = dayjs(endDate).format('MMM DD')

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
                accessorKey: 'reason',
                header: 'Reason',
                cell: ({ row }) => (
                    <div className="max-w-xs">
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {row.original.reason || 'No reason provided'}
                        </p>
                    </div>
                ),
            },
            {
                id: 'actions',
                header: 'Action',
                cell: ({ row }) => {
                    const isLoading = actionLoading?.id === row.original.id
                    const currentAction = actionLoading?.action

                    return (
                        <div className="flex items-center gap-2">
                            <Button
                                size="sm"
                                variant="default"
                                onClick={() => handleReject(row.original.id)}
                                loading={
                                    isLoading && currentAction === 'reject'
                                }
                                disabled={isLoading}
                                icon={<LiCrossCircle />}
                            >
                                Reject
                            </Button>
                            <Button
                                size="sm"
                                variant="solid"
                                onClick={() => handleApprove(row.original.id)}
                                loading={
                                    isLoading && currentAction === 'approve'
                                }
                                disabled={isLoading}
                                icon={<LiTickCircle />}
                            >
                                Approve
                            </Button>
                        </div>
                    )
                },
            },
        ],
        [actionLoading, handleApprove, handleReject],
    )

    return (
        <div className="space-y-4">
            <DataTable
                columns={columns}
                data={requestedData}
                skeletonAvatarColumns={[0]}
            />
        </div>
    )
}

export default RequestedTable
