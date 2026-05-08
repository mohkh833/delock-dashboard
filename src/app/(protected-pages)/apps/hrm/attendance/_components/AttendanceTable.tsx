'use client'

import { useMemo, useCallback, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useSearchParams } from 'next/navigation'
import Button from '@/components/ui/Button'
import Tag from '@/components/ui/Tag'
import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import ActionBar from '@/components/ui/ActionBar'
import classNames from '@/utils/classNames'
import sleep from '@/utils/sleep'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { useAttendanceStore } from '../_store/attendanceStore'
import { getAttendanceStatusConfig } from '../utils'
import { LiProfile, LiEdit2, LiTrash } from '@/icons'
import { LuEllipsis, LuX } from 'react-icons/lu'
import type { ColumnDef } from '@tanstack/react-table'
import type { TableQueries } from '@/@types/common'
import type { AttendanceRecord } from '../types'

type AttendanceTableProps = {
    onMarkAttendance: (record: AttendanceRecord | AttendanceRecord[]) => void
}

const formatTime = (time: string): string => {
    if (!time) return '—'
    const [hours, minutes] = time.split(':')
    const hour = parseInt(hours)
    const ampm = hour >= 12 ? 'PM' : 'AM'
    const displayHour = hour % 12 || 12
    return `${displayHour}:${minutes} ${ampm}`
}

const AttendanceTable = ({ onMarkAttendance }: AttendanceTableProps) => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const appendQueryParams = useAppendQueryParams()

    const records = useAttendanceStore((state) => state.data.records)
    const total = useAttendanceStore((state) => state.data.total)
    const initialLoading = useAttendanceStore((state) => state.initialLoading)
    const selectedRows = useAttendanceStore((state) => state.selectedRows)
    const selectedRecord = useAttendanceStore((state) => state.selectedRecord)
    const deleteDialogOpen = useAttendanceStore(
        (state) => state.deleteDialogOpen,
    )
    const setSelectedRows = useAttendanceStore((state) => state.setSelectedRows)
    const addSelectedRow = useAttendanceStore((state) => state.addSelectedRow)
    const removeSelectedRow = useAttendanceStore(
        (state) => state.removeSelectedRow,
    )
    const clearSelectedRows = useAttendanceStore(
        (state) => state.clearSelectedRows,
    )
    const setSelectedRecord = useAttendanceStore(
        (state) => state.setSelectedRecord,
    )
    const setDeleteDialogOpen = useAttendanceStore(
        (state) => state.setDeleteDialogOpen,
    )
    const deleteRecord = useAttendanceStore((state) => state.deleteRecord)
    const bulkDeleteRecords = useAttendanceStore(
        (state) => state.bulkDeleteRecords,
    )

    const [isDeleting, setIsDeleting] = useState(false)

    const pageIndex = Number(searchParams.get('pageIndex')) || 1
    const pageSize = Number(searchParams.get('pageSize')) || 10
    const sortKey = searchParams.get('sortKey') || ''
    const sortOrder = (searchParams.get('sortOrder') || '') as
        | ''
        | 'asc'
        | 'desc'

    const pagingState: TableQueries = {
        pageIndex,
        pageSize,
        sortKey,
        sortOrder,
        query: searchParams.get('query') || '',
    }

    const handlePagingChange = (data: TableQueries) => {
        appendQueryParams({
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            sortKey: data.sortKey || null,
            sortOrder: data.sortOrder || null,
        })
    }

    const handleRowAction = useCallback(
        (action: string, record: AttendanceRecord) => {
            switch (action) {
                case 'markAttendance':
                    onMarkAttendance(record)
                    break
                case 'viewProfile':
                    router.push(`/apps/hrm/employees?id=${record.employee.id}`)
                    break
                case 'delete':
                    setSelectedRecord(record)
                    setDeleteDialogOpen(true)
                    break
            }
        },
        [router, onMarkAttendance, setSelectedRecord, setDeleteDialogOpen],
    )

    const handleConfirmDelete = async () => {
        setIsDeleting(true)
        try {
            await sleep(800)
            if (selectedRecord) {
                deleteRecord(selectedRecord.id)
            } else {
                bulkDeleteRecords(selectedRows.map((r) => r.id))
            }
            setDeleteDialogOpen(false)
            setSelectedRecord(null)
        } finally {
            setIsDeleting(false)
        }
    }

    const getStatusBadge = useCallback((status: AttendanceRecord['status']) => {
        const config = getAttendanceStatusConfig(status)
        return (
            <Tag className={classNames(config.className, 'border-0')}>
                {config.label}
            </Tag>
        )
    }, [])

    const getActionDropdown = useCallback(
        (record: AttendanceRecord) => {
            const items = [
                {
                    key: 'viewProfile',
                    label: 'View Profile',
                    icon: <LiProfile />,
                },
                {
                    key: 'markAttendance',
                    label: 'Mark Attendance',
                    icon: <LiEdit2 />,
                },
                {
                    key: 'delete',
                    label: 'Delete Record',
                    icon: <LiTrash />,
                    className: 'text-red-600 hover:text-red-700',
                },
            ]

            return (
                <div className="inline-flex">
                    <Dropdown
                        placement="bottom-end"
                        renderTitle={
                            <Button
                                size="sm"
                                variant="ghost"
                                shape="circle"
                                icon={<LuEllipsis />}
                            />
                        }
                    >
                        {items.map((item) => (
                            <Dropdown.Item
                                key={item.key}
                                eventKey={item.key}
                                onClick={() =>
                                    handleRowAction(item.key, record)
                                }
                                className={item.className}
                            >
                                <div className="flex items-center gap-2">
                                    <span className="text-lg">{item.icon}</span>
                                    <span>{item.label}</span>
                                </div>
                            </Dropdown.Item>
                        ))}
                    </Dropdown>
                </div>
            )
        },
        [handleRowAction],
    )

    const columns: ColumnDef<AttendanceRecord>[] = useMemo(
        () => [
            {
                accessorKey: 'employee',
                header: 'Employee',
                cell: ({ row }) => {
                    const emp = row.original.employee
                    return (
                        <div className="flex items-center gap-2">
                            <Avatar
                                size={25}
                                shape="circle"
                                src={emp.avatar}
                                alt={emp.name}
                            >
                                {emp.name
                                    .split(' ')
                                    .map((n) => n[0])
                                    .join('')}
                            </Avatar>
                            <div>
                                <div className="font-medium heading-text text-nowrap">
                                    {emp.name}
                                </div>
                                <div className="text-xs">{emp.role}</div>
                            </div>
                        </div>
                    )
                },
            },
            {
                accessorKey: 'department',
                header: 'Department',
                cell: ({ row }) => row.original.employee.department,
            },
            {
                accessorKey: 'checkIn',
                header: 'Check-In',
                cell: ({ row }) => formatTime(row.original.checkIn || ''),
            },
            {
                accessorKey: 'checkOut',
                header: 'Check-Out',
                cell: ({ row }) => formatTime(row.original.checkOut || ''),
            },
            {
                accessorKey: 'totalHours',
                header: 'Total Hours',
                cell: ({ row }) => row.original.totalHours || '—',
            },
            {
                accessorKey: 'status',
                header: 'Status',
                cell: ({ row }) => getStatusBadge(row.original.status),
            },
            {
                accessorKey: 'markedBy',
                header: 'Marked By',
                cell: ({ row }) => {
                    const labels = {
                        system: 'System',
                        admin: 'Admin',
                        employee: 'Employee',
                        biometric: 'Biometric',
                    }
                    return (
                        labels[row.original.markedBy] || row.original.markedBy
                    )
                },
            },
            {
                id: 'actions',
                header: 'Actions',
                cell: ({ row }) => getActionDropdown(row.original),
            },
        ],
        [getStatusBadge, getActionDropdown],
    )

    return (
        <>
            <DataTable
                columns={columns}
                data={records}
                loading={initialLoading}
                selectable
                checkboxChecked={(row) =>
                    selectedRows.some((s) => s.id === row.id)
                }
                pagingData={{
                    total,
                    pageIndex: pagingState.pageIndex || 1,
                    pageSize: pagingState.pageSize || 10,
                }}
                pageSizes={[10, 20, 50]}
                onPaginationChange={(page) =>
                    handlePagingChange({ ...pagingState, pageIndex: page })
                }
                onPageSizeChange={(size) =>
                    handlePagingChange({
                        ...pagingState,
                        pageSize: size,
                        pageIndex: 1,
                    })
                }
                onSort={(sort) =>
                    handlePagingChange({
                        ...pagingState,
                        sortKey: String(sort.sortKey),
                        sortOrder: sort.sortOrder,
                        pageIndex: 1,
                    })
                }
                onRowSelect={(checked, row) => {
                    if (checked) {
                        addSelectedRow(row as AttendanceRecord)
                    } else {
                        removeSelectedRow((row as AttendanceRecord).id)
                    }
                }}
                onAllRowSelect={(checked, rows) => {
                    if (checked) {
                        setSelectedRows(
                            rows.map((r) => r.original as AttendanceRecord),
                        )
                    } else {
                        setSelectedRows([])
                    }
                }}
            />

            <ActionBar open={selectedRows.length > 0}>
                <div className="flex items-center justify-between w-full">
                    <span className="text-sm font-medium">
                        {selectedRows.length} record
                        {selectedRows.length > 1 ? 's' : ''} selected
                    </span>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="solid"
                            onClick={() => onMarkAttendance(selectedRows)}
                        >
                            Mark Attendance
                        </Button>
                        <Button
                            variant="ghost"
                            icon={<LiTrash />}
                            onClick={() => {
                                setSelectedRecord(null)
                                setDeleteDialogOpen(true)
                            }}
                            className="text-error hover:bg-error-subtle"
                        >
                            Delete
                        </Button>
                        <Button
                            size="sm"
                            variant="subtle"
                            icon={<LuX />}
                            onClick={clearSelectedRows}
                        />
                    </div>
                </div>
            </ActionBar>

            <ConfirmDialog
                isOpen={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleConfirmDelete}
                onCancel={() => setDeleteDialogOpen(false)}
                type="danger"
                title="Delete Attendance Record"
                confirmText="Delete"
                cancelText="Cancel"
                confirmButtonProps={{ loading: isDeleting }}
            >
                <p>
                    Are you sure you want to delete{' '}
                    {selectedRecord
                        ? 'this attendance record'
                        : `${selectedRows.length} attendance record${selectedRows.length > 1 ? 's' : ''}`}
                    ? This action cannot be undone.
                </p>
            </ConfirmDialog>
        </>
    )
}

export default AttendanceTable
