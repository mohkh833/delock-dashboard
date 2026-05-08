'use client'

import { useState } from 'react'
import Card from '@/components/ui/Card'
import Dialog from '@/components/ui/Dialog'
import Button from '@/components/ui/Button'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Avatar from '@/components/ui/Avatar'
import TimeInput from '@/components/ui/TimeInput'
import Tag from '@/components/ui/Tag'
import Scroll from '@/components/ui/Scroll'
import { FormItem, Form } from '@/components/ui/Form'
import { getAttendanceStatusOptions, getAttendanceStatusConfig } from '../utils'
import { useAttendanceStore } from '../_store/attendanceStore'
import sleep from '@/utils/sleep'
import classNames from '@/utils/classNames'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import type { AttendanceRecord } from '../types'

const validationSchema = z
    .object({
        checkIn: z.date().optional().nullable(),
        checkOut: z.date().optional().nullable(),
        status: z.enum(['present', 'absent', 'late', 'on_leave', 'remote']),
        notes: z.string().optional(),
    })
    .refine(
        (data) => {
            if (data.checkIn && data.checkOut) {
                return data.checkOut.getTime() > data.checkIn.getTime()
            }
            return true
        },
        {
            message: 'Check-out must be after check-in',
            path: ['checkOut'],
        },
    )

type FormSchema = z.infer<typeof validationSchema>

const MarkAttendanceDialog = () => {
    const markAttendanceOpen = useAttendanceStore(
        (state) => state.markAttendanceOpen,
    )
    const selectedRecord = useAttendanceStore((state) => state.selectedRecord)
    const selectedRows = useAttendanceStore((state) => state.selectedRows)
    const setMarkAttendanceOpen = useAttendanceStore(
        (state) => state.setMarkAttendanceOpen,
    )
    const setSelectedRecord = useAttendanceStore(
        (state) => state.setSelectedRecord,
    )
    const clearSelectedRows = useAttendanceStore(
        (state) => state.clearSelectedRows,
    )
    const updateRecord = useAttendanceStore((state) => state.updateRecord)

    const [isSubmitting, setIsSubmitting] = useState(false)

    const statusOptions = getAttendanceStatusOptions().filter(
        (o) => o.value !== 'all',
    )

    const timeStringToDate = (timeString?: string) => {
        if (!timeString) return null
        const [hours, minutes] = timeString.split(':').map(Number)
        const date = new Date()
        date.setHours(hours, minutes, 0, 0)
        return date
    }

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormSchema>({
        defaultValues: {
            checkIn: timeStringToDate(selectedRecord?.checkIn),
            checkOut: timeStringToDate(selectedRecord?.checkOut),
            status: selectedRecord?.status || 'present',
            notes: selectedRecord?.notes || '',
        },
        resolver: zodResolver(validationSchema),
    })

    const dateToTimeString = (date: Date | null | undefined) => {
        if (!date) return undefined
        return date.toTimeString().slice(0, 5)
    }

    const calcTotalHours = (
        checkIn: Date | null | undefined,
        checkOut: Date | null | undefined,
    ) => {
        if (!checkIn || !checkOut) return undefined
        const diffMs = checkOut.getTime() - checkIn.getTime()
        const diffMinutes = Math.floor(diffMs / (1000 * 60))
        const hours = Math.floor(diffMinutes / 60)
        const minutes = diffMinutes % 60
        return `${hours}h ${minutes}m`
    }

    const handleFormSubmit = async (data: FormSchema) => {
        setIsSubmitting(true)
        try {
            await sleep(800)
            const totalHours = calcTotalHours(data.checkIn, data.checkOut)
            const updates: Partial<AttendanceRecord> = {
                checkIn: dateToTimeString(data.checkIn),
                checkOut: dateToTimeString(data.checkOut),
                totalHours,
                status: data.status,
                notes: data.notes || undefined,
                markedBy: 'admin',
            }

            if (selectedRows.length > 0) {
                selectedRows.forEach((rec) => updateRecord(rec.id, updates))
            } else if (selectedRecord) {
                updateRecord(selectedRecord.id, updates)
            }

            clearSelectedRows()
            handleClose()
        } finally {
            setIsSubmitting(false)
        }
    }

    const handleClose = () => {
        setMarkAttendanceOpen(false)
        setSelectedRecord(null)
        reset()
    }

    return (
        <Dialog isOpen={markAttendanceOpen} onClose={handleClose} width={500}>
            <div className="space-y-4">
                <div>
                    <h5>
                        {selectedRows.length > 0
                            ? `Mark Attendance (${selectedRows.length} employee${selectedRows.length > 1 ? 's' : ''})`
                            : 'Mark Attendance'}
                    </h5>

                    {selectedRecord && (
                        <div className="space-y-2 mt-4">
                            <label className="heading-text font-medium">
                                Selected Employee
                            </label>
                            <Card bodyClass="p-0">
                                <div className="flex items-center justify-between py-2.5 px-4">
                                    <div className="flex items-center gap-2">
                                        <Avatar
                                            size={24}
                                            shape="circle"
                                            src={selectedRecord.employee.avatar}
                                            alt={selectedRecord.employee.name}
                                        >
                                            {selectedRecord.employee.name
                                                .split(' ')
                                                .map((n) => n[0])
                                                .join('')}
                                        </Avatar>
                                        <div>
                                            <div className="font-medium heading-text">
                                                {selectedRecord.employee.name}
                                            </div>
                                            <div className="text-xs">
                                                {
                                                    selectedRecord.employee
                                                        .department
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <Tag
                                        className={classNames(
                                            getAttendanceStatusConfig(
                                                selectedRecord.status,
                                            ).className,
                                            'border-0',
                                        )}
                                    >
                                        {
                                            getAttendanceStatusConfig(
                                                selectedRecord.status,
                                            ).label
                                        }
                                    </Tag>
                                </div>
                            </Card>
                        </div>
                    )}
                </div>

                {selectedRows.length > 0 && (
                    <div className="space-y-2">
                        <label className="heading-text font-medium">
                            Selected Employees
                        </label>
                        <Card bodyClass="p-0">
                            <Scroll.FlexSize
                                className="max-h-[250px]"
                                edgeShadow
                            >
                                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                                    {selectedRows.map((emp) => (
                                        <div
                                            key={emp.id}
                                            className="flex items-center justify-between py-2.5 px-4"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Avatar
                                                    size={24}
                                                    shape="circle"
                                                    src={emp.employee.avatar}
                                                    alt={emp.employee.name}
                                                >
                                                    {emp.employee.name
                                                        .split(' ')
                                                        .map((n) => n[0])
                                                        .join('')}
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium heading-text">
                                                        {emp.employee.name}
                                                    </div>
                                                    <div className="text-xs">
                                                        {
                                                            emp.employee
                                                                .department
                                                        }
                                                    </div>
                                                </div>
                                            </div>
                                            <Tag
                                                className={classNames(
                                                    getAttendanceStatusConfig(
                                                        emp.status,
                                                    ).className,
                                                    'border-0',
                                                )}
                                            >
                                                {
                                                    getAttendanceStatusConfig(
                                                        emp.status,
                                                    ).label
                                                }
                                            </Tag>
                                        </div>
                                    ))}
                                </div>
                            </Scroll.FlexSize>
                        </Card>
                    </div>
                )}

                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <div className="grid grid-cols-2 gap-4">
                        <FormItem
                            label="Check-In Time"
                            invalid={Boolean(errors.checkIn)}
                            errorMessage={errors.checkIn?.message}
                        >
                            <Controller
                                name="checkIn"
                                control={control}
                                render={({ field }) => (
                                    <TimeInput
                                        value={field.value || null}
                                        onChange={field.onChange}
                                        invalid={Boolean(errors.checkIn)}
                                        clearable
                                    />
                                )}
                            />
                        </FormItem>
                        <FormItem
                            label="Check-Out Time"
                            invalid={Boolean(errors.checkOut)}
                            errorMessage={errors.checkOut?.message}
                        >
                            <Controller
                                name="checkOut"
                                control={control}
                                render={({ field }) => (
                                    <TimeInput
                                        value={field.value || null}
                                        onChange={field.onChange}
                                        invalid={Boolean(errors.checkOut)}
                                        clearable
                                    />
                                )}
                            />
                        </FormItem>
                    </div>
                    <FormItem
                        label="Status"
                        invalid={Boolean(errors.status)}
                        errorMessage={errors.status?.message}
                    >
                        <Controller
                            name="status"
                            control={control}
                            render={({ field }) => (
                                <Select
                                    options={statusOptions}
                                    value={statusOptions.find(
                                        (o) => o.value === field.value,
                                    )}
                                    onChange={(option) =>
                                        field.onChange(option?.value)
                                    }
                                    placeholder="Select status"
                                />
                            )}
                        />
                    </FormItem>
                    <FormItem
                        label="Notes"
                        invalid={Boolean(errors.notes)}
                        errorMessage={errors.notes?.message}
                    >
                        <Controller
                            name="notes"
                            control={control}
                            render={({ field }) => (
                                <Input
                                    {...field}
                                    textArea
                                    placeholder="Add any notes..."
                                    rows={3}
                                />
                            )}
                        />
                    </FormItem>
                    <div className="flex items-center justify-end gap-2">
                        <Button
                            type="button"
                            onClick={handleClose}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            variant="solid"
                            loading={isSubmitting}
                        >
                            Save Attendance
                        </Button>
                    </div>
                </Form>
            </div>
        </Dialog>
    )
}

export default MarkAttendanceDialog
