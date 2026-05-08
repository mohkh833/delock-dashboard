'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Card from '@/components/ui/Card'
import Switcher from '@/components/ui/Switcher'
import FormFieldWrapper from '../../_components/FormFieldWrapper'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import PasswordChangeModal from './PasswordChangeModal'
import TwoFactorConfigModal from './TwoFactorConfigModal'
import { apiGetSettingsSecurity } from '@/services/client/AccountService'
import sleep from '@/utils/sleep'
import formatRelativeTime from '@/utils/formatRelativeTime'
import EmptyState from '@/components/shared/EmptyState'
import IconFrame from '@/components/shared/IconFrame'
import { getSecurityDisplay, getMethodDisplay } from '../../utils'
import { LiDesktop, LiTrash } from '@/icons'
import { HiCheckCircle } from 'react-icons/hi'
import Image from 'next/image'
import useSWR from 'swr'
import type {
    GetSecuritySettingsResponse,
    TwoFactorMethod,
    SecurityStrength,
    Device,
} from '../../types'

type SecurityProps = {
    initialData: GetSecuritySettingsResponse
}

const Security = ({ initialData }: SecurityProps) => {
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
    const [isTwoFactorModalOpen, setIsTwoFactorModalOpen] = useState(false)
    const [isToggling, setIsToggling] = useState(false)
    const [isRemoving, setIsRemoving] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [deviceToRemove, setDeviceToRemove] = useState<Device | null>(null)
    const [isRemovingAllDevicesDialogOpen, setIsRemovingAllDevicesDialogOpen] =
        useState(false)

    const { data, mutate, isLoading } = useSWR<GetSecuritySettingsResponse>(
        '/api/settings/security',
        apiGetSettingsSecurity,
        {
            fallbackData: initialData,
            revalidateOnFocus: false,
            revalidateOnReconnect: true,
        },
    )

    const handlePasswordChange = async () => {
        setIsSubmitting(true)
        await sleep(1000)
        setIsPasswordModalOpen(false)
        setIsSubmitting(false)
    }

    const handleTwoFactorToggle = async (enabled: boolean) => {
        setIsToggling(true)
        await sleep(1000)
        mutate(
            { ...data!, twoFactorAuth: { ...data!.twoFactorAuth, enabled } },
            false,
        )
        setIsToggling(false)
    }

    const handleTwoFactorConfigure = async (config: {
        method: TwoFactorMethod
        phoneNumber?: string
        email?: string
    }) => {
        setIsSubmitting(true)
        await sleep(1000)
        mutate(
            {
                ...data!,
                twoFactorAuth: {
                    ...data!.twoFactorAuth,
                    method: config.method,
                },
            },
            false,
        )
        setIsTwoFactorModalOpen(false)
        setIsSubmitting(false)
    }

    const handleDeviceRemove = async (deviceId: string) => {
        setIsRemoving(true)
        await sleep(1000)
        mutate(
            {
                ...data!,
                devices: data!.devices.filter((d) => d.id !== deviceId),
            },
            false,
        )
        setIsRemoving(false)
        setDeviceToRemove(null)
    }

    const handleRemoveAllDevices = async () => {
        setIsRemoving(true)
        await sleep(1000)
        mutate({ ...data!, devices: [] }, false)
        setIsRemovingAllDevicesDialogOpen(false)
        setIsRemoving(false)
    }

    const renderStatus = (strength: SecurityStrength) => {
        const securityDisplay = getSecurityDisplay(strength)
        return (
            <div className="flex items-center gap-1 flex-shrink-0">
                {securityDisplay.showIcon && (
                    <HiCheckCircle
                        className={`w-4 h-4 ${securityDisplay.className}`}
                    />
                )}
                <span
                    className={`text-sm font-medium ${securityDisplay.className}`}
                >
                    {securityDisplay.text}
                </span>
            </div>
        )
    }

    return (
        <>
            <div className="space-y-4">
                <div className="py-4">
                    <div className="mb-4">
                        <h5>Account Security</h5>
                        <p>Set up account security to protect your account</p>
                    </div>
                    <div>
                        {data && (
                            <>
                                <FormFieldWrapper
                                    label="Password"
                                    description="Set a password to protect your account."
                                    formItemClass="md:max-w-auto"
                                >
                                    <div className="space-y-3">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <div className="heading-text font-mono tracking-wider">
                                                    ••••••••••••••••
                                                </div>
                                                {renderStatus(
                                                    data.password.strength,
                                                )}
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    setIsPasswordModalOpen(true)
                                                }
                                                className="self-start sm:self-center flex-shrink-0"
                                            >
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                </FormFieldWrapper>
                                <FormFieldWrapper
                                    label="Two-step verification"
                                    description="Add an extra layer of security in addition to your password."
                                    formItemClass="md:max-w-auto"
                                    border={false}
                                >
                                    <div className="space-y-1">
                                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            <div className="flex items-center gap-3 min-w-0 flex-1">
                                                <Switcher
                                                    checked={
                                                        data.twoFactorAuth
                                                            .enabled
                                                    }
                                                    onChange={
                                                        handleTwoFactorToggle
                                                    }
                                                    disabled={isToggling}
                                                    isLoading={isToggling}
                                                />
                                                {data.twoFactorAuth.enabled &&
                                                    data.twoFactorAuth
                                                        .method && (
                                                        <div>
                                                            Authentication
                                                            Method:
                                                            <span className="font-medium heading-text">
                                                                {` `}
                                                                {getMethodDisplay(
                                                                    data
                                                                        .twoFactorAuth
                                                                        .method,
                                                                )}
                                                            </span>
                                                        </div>
                                                    )}
                                                {!data.twoFactorAuth
                                                    .enabled && (
                                                    <div className="heading-text">
                                                        Enable two-factor
                                                        authentication
                                                    </div>
                                                )}
                                            </div>
                                            <Button
                                                onClick={() =>
                                                    setIsTwoFactorModalOpen(
                                                        true,
                                                    )
                                                }
                                                disabled={
                                                    !data.twoFactorAuth
                                                        .enabled || isToggling
                                                }
                                                className="self-start sm:self-center flex-shrink-0"
                                            >
                                                Change Method
                                            </Button>
                                        </div>
                                    </div>
                                </FormFieldWrapper>
                            </>
                        )}
                    </div>
                </div>
                <div className="py-4">
                    <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                            <h5>Device Management</h5>
                            <p>Devices that login to your account</p>
                        </div>
                        <Button
                            onClick={() =>
                                setIsRemovingAllDevicesDialogOpen(true)
                            }
                            disabled={data && data.devices.length === 0}
                        >
                            Remove all devices
                        </Button>
                    </div>
                    {data && data.devices.length > 0 && (
                        <Card bodyClass="p-0 divide-y divide-gray-200 dark:divide-gray-700">
                            {data.devices.map((device) => (
                                <div
                                    key={device.id}
                                    className="flex sm:items-center gap-2 sm:gap-4 p-3 sm:p-4"
                                >
                                    <div className="flex sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                        <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 border border-gray-200 dark:border-gray-800 rounded-lg flex-shrink-0">
                                            <Image
                                                src={`/img/thumbs/brands/${device.browser}.png`}
                                                alt={device.location.country}
                                                width={24}
                                                height={24}
                                            />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                                                <h6>{device.deviceName}</h6>
                                            </div>
                                            <div className="flex flex-col xs:flex-row xs:items-center gap-1 xs:gap-2 font-medium">
                                                <div className="flex items-center gap-2">
                                                    <span className="truncate">
                                                        {device.location.city},{' '}
                                                        {
                                                            device.location
                                                                .country
                                                        }
                                                    </span>
                                                </div>
                                                <span className="hidden sm:block">
                                                    •
                                                </span>
                                                <span className="whitespace-nowrap flex items-center gap-1">
                                                    {device.isCurrentSession
                                                        ? 'Current Session'
                                                        : formatRelativeTime(
                                                              device.lastAccessTime,
                                                          )}
                                                    {device.isCurrentSession && (
                                                        <span className="relative flex size-2 mt-0.25">
                                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-75"></span>
                                                            <span className="relative inline-flex size-2 rounded-full bg-success"></span>
                                                        </span>
                                                    )}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex justify-end sm:justify-center flex-shrink-0">
                                        <Button
                                            variant="ghost"
                                            icon={<LiTrash />}
                                            onClick={() =>
                                                setDeviceToRemove(
                                                    device as Device,
                                                )
                                            }
                                            className="text-base hover:text-error"
                                        />
                                    </div>
                                </div>
                            ))}
                        </Card>
                    )}
                    {!isLoading && data && data.devices.length === 0 && (
                        <div className="flex-1 flex flex-col items-center justify-center">
                            <EmptyState
                                variant="wave"
                                size={280}
                                offset={-80}
                                illustration={
                                    <IconFrame>
                                        <LiDesktop className="text-primary text-xl" />
                                    </IconFrame>
                                }
                            >
                                <div className="text-center">
                                    <h5>No Devices</h5>
                                    <p>
                                        You don&apos;t have any devices logged
                                        in
                                    </p>
                                </div>
                            </EmptyState>
                        </div>
                    )}
                </div>
            </div>
            <PasswordChangeModal
                isOpen={isPasswordModalOpen}
                onClose={() => setIsPasswordModalOpen(false)}
                isSubmitting={isSubmitting}
                onSubmit={handlePasswordChange}
            />
            <TwoFactorConfigModal
                isOpen={isTwoFactorModalOpen}
                onClose={() => setIsTwoFactorModalOpen(false)}
                onSubmit={handleTwoFactorConfigure}
                isSubmitting={isSubmitting}
                currentMethod={data?.twoFactorAuth?.method}
            />
            <ConfirmDialog
                isOpen={Boolean(deviceToRemove)}
                title="Remove Device"
                type="danger"
                onClose={() => setDeviceToRemove(null)}
                onCancel={() => setDeviceToRemove(null)}
                onConfirm={() =>
                    handleDeviceRemove(deviceToRemove?.id as string)
                }
                confirmButtonProps={{ loading: isRemoving }}
            >
                <p className="mb-4">
                    Are you sure you want to remove{' '}
                    <strong className="heading-text">
                        {deviceToRemove?.deviceName}
                    </strong>{' '}
                    from your account?
                </p>
            </ConfirmDialog>
            <ConfirmDialog
                isOpen={isRemovingAllDevicesDialogOpen}
                title="Remove all devices"
                type="danger"
                onClose={() => setIsRemovingAllDevicesDialogOpen(false)}
                onCancel={() => setIsRemovingAllDevicesDialogOpen(false)}
                onConfirm={handleRemoveAllDevices}
                confirmText="Remove all devices"
                confirmButtonProps={{ loading: isRemoving }}
            >
                <p>
                    Are you sure you want to remove all{' '}
                    <strong className="heading-text">
                        {data?.devices?.length}
                    </strong>{' '}
                    other devices from your account?
                </p>
            </ConfirmDialog>
        </>
    )
}

export default Security
