'use client'

import { useState, useEffect, useRef } from 'react'
import Dialog from '@/components/ui/Dialog'
import { Form, FormItem } from '@/components/ui/Form'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Input from '@/components/ui/Input'
import Alert from '@/components/ui/Alert'
import Dropdown from '@/components/ui/Dropdown'
import Scroll from '@/components/ui/Scroll'
import Avatar from '@/components/ui/Avatar'
import Card from '@/components/ui/Card'
import IconFrame from '@/components/shared/IconFrame'
import { roleIconMap } from '../utils'
import { useAccessControlStore } from '../store/accessControlStore'
import classNames from '@/utils/classNames'
import sleep from '@/utils/sleep'
import { LiChevronDown, LiCross, LiTrash, LiUser } from '@/icons'
import { z } from 'zod'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import type { GetUserListResponse } from '../types'

type FormSchema = {
    confirmationText: string
    memberReassignments: Record<string, string>
}

const DeleteRoleDialog = () => {
    const roleList = useAccessControlStore((s) => s.roleList)
    const setRolesData = useAccessControlStore((s) => s.setRolesData)
    const setUsersData = useAccessControlStore((s) => s.setUsersData)
    const userList = useAccessControlStore((s) => s.userList)

    const isDeleteModalOpen = useAccessControlStore(
        (state) => state.isDeleteModalOpen,
    )
    const selectedRole = useAccessControlStore((state) => state.selectedRole)
    const closeDeleteModal = useAccessControlStore(
        (state) => state.closeDeleteModal,
    )
    const setSelectedRole = useAccessControlStore(
        (state) => state.setSelectedRole,
    )

    const [memberReassignments, setMemberReassignments] = useState<
        Record<string, string>
    >({})
    const [checkedUsers, setCheckedUsers] = useState<string[]>([])
    const [bulkRoleId, setBulkRoleId] = useState<string>('')
    const hasSetDefaults = useRef(false)

    // Filter users who have this role — no extra SWR fetch needed
    const usersWithRole = selectedRole
        ? userList.filter((u) => u.role.includes(selectedRole.id))
        : []

    const validationSchema = z.object({
        confirmationText: z
            .string()
            .min(1, 'Please enter the role name to confirm'),
        memberReassignments: z.record(
            z.string(),
            z
                .string()
                .min(1, { message: 'Please select a role for reassignment' }),
        ),
    })

    const {
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
        control,
        setValue,
        setError,
        clearErrors,
    } = useForm<FormSchema>({
        defaultValues: {
            confirmationText: '',
            memberReassignments: {},
        },
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isDeleteModalOpen) {
            hasSetDefaults.current = false
            const initialReassignments: Record<string, string> = {}
            usersWithRole.forEach((user) => {
                initialReassignments[user.id] = ''
            })
            setMemberReassignments(initialReassignments)
            setCheckedUsers([])
            setBulkRoleId('')
            reset({
                confirmationText: '',
                memberReassignments: initialReassignments,
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleteModalOpen, selectedRole])

    useEffect(() => {
        if (usersWithRole.length > 0 && roleList && !hasSetDefaults.current) {
            const defaultReassignments: Record<string, string> = {}

            if (selectedRole) {
                usersWithRole.forEach((user) => {
                    defaultReassignments[user.id] = selectedRole.id
                })
            }

            setMemberReassignments(defaultReassignments)
            setValue('memberReassignments', defaultReassignments)
            hasSetDefaults.current = true
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [usersWithRole.length, roleList, selectedRole])

    const handleClose = async () => {
        closeDeleteModal()
        setSelectedRole(null)
        await sleep(200)
        reset()
        setMemberReassignments({})
        setBulkRoleId('')
    }

    const handleMemberReassignment = (memberId: string, newRoleId: string) => {
        const updatedReassignments = {
            ...memberReassignments,
            [memberId]: newRoleId,
        }
        setMemberReassignments(updatedReassignments)
        setValue('memberReassignments', updatedReassignments)

        if (newRoleId) {
            clearErrors(`memberReassignments.${memberId}`)
        }
    }

    const handleFormSubmit = async (values: FormSchema) => {
        if (!selectedRole) return

        try {
            if (values.confirmationText !== selectedRole.name) {
                setError('confirmationText', {
                    type: 'manual',
                    message: 'Role name does not match',
                })
                return
            }

            if (hasMembers) {
                await sleep(500)
                setUsersData((currentData: GetUserListResponse) => {
                    if (!currentData) return currentData

                    const updatedUsers = currentData.list.map((user) => {
                        const newRoleId = values.memberReassignments[user.id]
                        const usersToUpdate = Object.keys(
                            values.memberReassignments,
                        )
                        const currentUserRoles = user.role

                        if (usersToUpdate.includes(user.id)) {
                            if (currentUserRoles.includes(newRoleId)) {
                                return {
                                    ...user,
                                    role: currentUserRoles.filter(
                                        (role) => role !== selectedRole.id,
                                    ),
                                }
                            }

                            return {
                                ...user,
                                role: [...user.role, newRoleId].filter(
                                    (role) => role !== selectedRole.id,
                                ),
                            }
                        }
                        return user
                    })

                    return {
                        ...currentData,
                        list: updatedUsers,
                    }
                })
            }

            setRolesData((currentData) => {
                if (!currentData) return currentData

                const updatedRoles = currentData.filter(
                    (role) => role.id !== selectedRole.id,
                )

                return updatedRoles
            })

            handleClose()
        } catch (error) {
            console.error('Error deleting role:', error)
            setError('confirmationText', {
                type: 'manual',
                message: 'Failed to delete role. Please try again.',
            })
        }
    }

    const handleCheckboxChange = (memberId: string) => {
        if (!checkedUsers.includes(memberId)) {
            setCheckedUsers([...checkedUsers, memberId])
        } else {
            setCheckedUsers(checkedUsers.filter((id) => id !== memberId))
        }
    }

    const handleBulkRoleAssignment = (roleId: string) => {
        setBulkRoleId(roleId)

        if (checkedUsers.length > 0) {
            const updatedReassignments = { ...memberReassignments }

            checkedUsers.forEach((userId) => {
                updatedReassignments[userId] = roleId
                clearErrors(`memberReassignments.${userId}`)
            })

            setMemberReassignments(updatedReassignments)
            setValue('memberReassignments', updatedReassignments)
        }
    }

    if (!selectedRole) return null

    const RoleIcon = roleIconMap[selectedRole.icon] || LiUser

    const hasMembers = usersWithRole.length > 0

    return (
        <Dialog
            isOpen={isDeleteModalOpen}
            onClose={handleClose}
            closable={false}
            className="p-0"
            width={600}
        >
            <div className="border-b border-gray-200 dark:border-gray-700 p-4 flex items-center justify-between gap-2">
                <div className="flex items-center gap-4">
                    <IconFrame variant="thick">
                        <LiTrash className="text-xl heading-text" />
                    </IconFrame>
                    <div>
                        <h5>Delete Role</h5>
                        <p className="pr-12">
                            Think twice before executing this action
                        </p>
                    </div>
                </div>
                <Button
                    variant="subtle"
                    size="sm"
                    type="button"
                    icon={<LiCross className="text-2xl" />}
                    onClick={handleClose}
                />
            </div>

            <div className="p-4">
                <Form onSubmit={handleSubmit(handleFormSubmit)}>
                    <Alert showIcon className="items-start mb-4">
                        <p className="leading-relaxed">
                            This will permanently delete the role
                            <span className="">
                                <span className="inline-flex align-middle mx-1">
                                    <RoleIcon />
                                </span>
                                <span className="font-medium">
                                    {selectedRole.name}
                                </span>
                            </span>
                            , This action cannot be undone, and all permissions
                            tied to this role will be removed
                        </p>
                    </Alert>
                    {hasMembers && (
                        <div className="mb-6">
                            <div className="mb-4">
                                <div className="font-medium heading-text mb-1">
                                    Member Reassignment ({usersWithRole.length}{' '}
                                    members)
                                </div>
                                <p>
                                    All members currently assigned to this role
                                    must be reassigned to other roles before
                                    deletion.
                                </p>
                            </div>
                            <Card
                                bodyClass="p-0"
                                header={{
                                    content: (
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Checkbox
                                                    checked={
                                                        usersWithRole.length >
                                                            0 &&
                                                        checkedUsers.length ===
                                                            usersWithRole.length
                                                    }
                                                    indeterminate={
                                                        checkedUsers.length >
                                                            0 &&
                                                        checkedUsers.length <
                                                            usersWithRole.length
                                                    }
                                                    onChange={(checked) => {
                                                        if (checked) {
                                                            setCheckedUsers(
                                                                usersWithRole.map(
                                                                    (user) =>
                                                                        user.id,
                                                                ),
                                                            )
                                                        } else {
                                                            setCheckedUsers([])
                                                        }
                                                    }}
                                                >
                                                    <span className="heading-text font-medium">
                                                        {checkedUsers.length > 0
                                                            ? `Assign ${checkedUsers.length} selected to:`
                                                            : 'Select All'}
                                                    </span>
                                                </Checkbox>
                                            </div>
                                            {checkedUsers.length > 0 && (
                                                <div>
                                                    <Dropdown
                                                        placement="bottom-end"
                                                        renderTitle={
                                                            <Button
                                                                size="sm"
                                                                type="button"
                                                                iconAlignment="end"
                                                                icon={
                                                                    <LiChevronDown />
                                                                }
                                                            >
                                                                <span className="capitalize truncate">
                                                                    {bulkRoleId
                                                                        ? roleList?.find(
                                                                              (
                                                                                  role,
                                                                              ) =>
                                                                                  role.id ===
                                                                                  bulkRoleId,
                                                                          )
                                                                              ?.name ||
                                                                          'Choose Role'
                                                                        : 'Choose Role'}
                                                                </span>
                                                            </Button>
                                                        }
                                                    >
                                                        {roleList?.map(
                                                            (role) => {
                                                                const RIcon =
                                                                    roleIconMap[
                                                                        role
                                                                            .icon
                                                                    ] || LiUser
                                                                return (
                                                                    <Dropdown.Item
                                                                        eventKey={
                                                                            role.id
                                                                        }
                                                                        key={
                                                                            role.id
                                                                        }
                                                                        onClick={() =>
                                                                            handleBulkRoleAssignment(
                                                                                role.id,
                                                                            )
                                                                        }
                                                                        disabled={
                                                                            role.id ===
                                                                            selectedRole.id
                                                                        }
                                                                    >
                                                                        <div className="flex items-center gap-2">
                                                                            <RIcon className="text-lg" />
                                                                            <span className="capitalize">
                                                                                {
                                                                                    role.name
                                                                                }
                                                                            </span>
                                                                        </div>
                                                                    </Dropdown.Item>
                                                                )
                                                            },
                                                        )}
                                                    </Dropdown>
                                                </div>
                                            )}
                                        </div>
                                    ),
                                    className: 'p-4',
                                }}
                            >
                                <Scroll.FlexSize
                                    edgeShadow
                                    className="max-h-[400px]"
                                >
                                    <div className="divide-y divide-gray-200 dark:divide-gray-800">
                                        {usersWithRole.map((user) => {
                                            return (
                                                <div
                                                    key={user.id}
                                                    className="px-4 py-2 flex items-center justify-between gap-2"
                                                >
                                                    <div className="flex items-center gap-2">
                                                        <Checkbox
                                                            checked={checkedUsers.includes(
                                                                user.id,
                                                            )}
                                                            onChange={() =>
                                                                handleCheckboxChange(
                                                                    user.id,
                                                                )
                                                            }
                                                        />
                                                        <div className="flex items-center gap-2">
                                                            <Avatar
                                                                size={30}
                                                                src={user.img}
                                                                alt={user.name}
                                                                shape="circle"
                                                            >
                                                                {user.name
                                                                    .charAt(0)
                                                                    .toUpperCase()}
                                                            </Avatar>
                                                            <div>
                                                                <div className="font-medium heading-text">
                                                                    {user.name}
                                                                </div>
                                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                                    {user.email}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="w-40 flex justify-end">
                                                        <FormItem
                                                            invalid={Boolean(
                                                                errors
                                                                    .memberReassignments?.[
                                                                    user.id
                                                                ],
                                                            )}
                                                            errorMessage={
                                                                errors
                                                                    .memberReassignments?.[
                                                                    user.id
                                                                ]?.message
                                                            }
                                                            className="mb-0"
                                                        >
                                                            <Controller
                                                                name={`memberReassignments.${user.id}`}
                                                                control={
                                                                    control
                                                                }
                                                                render={({
                                                                    field,
                                                                }) => (
                                                                    <Dropdown
                                                                        placement="bottom-end"
                                                                        renderTitle={
                                                                            <Button
                                                                                size="sm"
                                                                                type="button"
                                                                                iconAlignment="end"
                                                                                icon={
                                                                                    <LiChevronDown />
                                                                                }
                                                                            >
                                                                                <span className="capitalize truncate">
                                                                                    {field.value ||
                                                                                        'Choose Role'}
                                                                                </span>
                                                                            </Button>
                                                                        }
                                                                    >
                                                                        {roleList?.map(
                                                                            (
                                                                                role,
                                                                            ) => {
                                                                                const RIcon =
                                                                                    roleIconMap[
                                                                                        role
                                                                                            .icon
                                                                                    ] ||
                                                                                    LiUser
                                                                                return (
                                                                                    <Dropdown.Item
                                                                                        eventKey={
                                                                                            role.id
                                                                                        }
                                                                                        key={
                                                                                            role.id
                                                                                        }
                                                                                        onClick={() =>
                                                                                            handleMemberReassignment(
                                                                                                user.id,
                                                                                                role.id,
                                                                                            )
                                                                                        }
                                                                                        disabled={
                                                                                            field.value ===
                                                                                            role.id
                                                                                        }
                                                                                    >
                                                                                        <div className="flex items-center gap-2">
                                                                                            <RIcon className="text-lg" />
                                                                                            <span className="capitalize">
                                                                                                {
                                                                                                    role.name
                                                                                                }
                                                                                            </span>
                                                                                        </div>
                                                                                    </Dropdown.Item>
                                                                                )
                                                                            },
                                                                        )}
                                                                    </Dropdown>
                                                                )}
                                                            />
                                                        </FormItem>
                                                    </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </Scroll.FlexSize>
                            </Card>
                        </div>
                    )}
                    <div className="mb-6">
                        <FormItem
                            label={`Type "${selectedRole.name}" to confirm deletion`}
                            invalid={Boolean(errors.confirmationText)}
                            errorMessage={errors.confirmationText?.message}
                        >
                            <Controller
                                name="confirmationText"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        placeholder={`Type "${selectedRole.name}" here`}
                                        {...field}
                                    />
                                )}
                            />
                        </FormItem>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" onClick={handleClose}>
                            Cancel
                        </Button>
                        <Button
                            variant="solid"
                            loading={isSubmitting}
                            type="submit"
                            disabled={isSubmitting}
                            className={({
                                unclickable,
                            }: {
                                unclickable: boolean
                            }) =>
                                classNames(
                                    'bg-error text-white',
                                    unclickable
                                        ? 'opacity-50 cursor-not-allowed'
                                        : 'hover:bg-error-deep',
                                )
                            }
                        >
                            Delete Role
                        </Button>
                    </div>
                </Form>
            </div>
        </Dialog>
    )
}

export default DeleteRoleDialog
