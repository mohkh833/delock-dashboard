'use client'

import { useEffect } from 'react'
import Input from '@/components/ui/Input'
import Radio from '@/components/ui/Radio'
import { FormItem } from '@/components/ui/Form'
import { Controller } from 'react-hook-form'
import { useEmployeesStore } from '../_store/employeesStore'
import { statusOptions } from '../utils'
import type { EmployeeFormData } from '../types'
import type { UseFormReturn } from 'react-hook-form'

type AccountInfoStepProps = {
    form: UseFormReturn<EmployeeFormData>
}

const AccountInfoStep = ({ form }: AccountInfoStepProps) => {
    const {
        control,
        formState: { errors },
        watch,
        setValue,
    } = form
    const editEmployee = useEmployeesStore((state) => state.editEmployee)

    const firstName = watch('firstName')
    const lastName = watch('lastName')
    const currentLoginEmail = watch('loginEmail')

    useEffect(() => {
        if (!editEmployee && firstName && lastName) {
            const generatedEmail = `${firstName.toLowerCase().replace(/\s+/g, '')}.${lastName.toLowerCase().replace(/\s+/g, '')}@infotech.co`
            if (
                !currentLoginEmail ||
                currentLoginEmail.endsWith('@infotech.co')
            ) {
                setValue('loginEmail', generatedEmail)
            }
        }
    }, [firstName, lastName, editEmployee, currentLoginEmail, setValue])

    return (
        <>
            <FormItem
                label="Employee ID"
                invalid={Boolean(errors.employeeId)}
                errorMessage={errors.employeeId?.message as string}
            >
                <div className="flex gap-2">
                    <Controller
                        name="employeeId"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                placeholder="Enter employee ID"
                                className="flex-1"
                                disabled
                            />
                        )}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    Employee ID must be unique. Auto-generated.
                </p>
            </FormItem>
            <FormItem
                label="Login Email"
                invalid={Boolean(errors.loginEmail)}
                errorMessage={errors.loginEmail?.message as string}
            >
                <div className="flex gap-2">
                    <Controller
                        name="loginEmail"
                        control={control}
                        render={({ field }) => (
                            <Input
                                {...field}
                                type="email"
                                placeholder="Enter login email"
                                className="flex-1"
                                disabled={Boolean(editEmployee)}
                            />
                        )}
                    />
                </div>
                <p className="text-xs text-gray-500 mt-1">
                    {editEmployee
                        ? 'Login email cannot be changed after account creation.'
                        : 'Auto-generated from first and last name. You can modify if needed.'}
                </p>
            </FormItem>
            <FormItem
                label="Status"
                invalid={Boolean(errors.status)}
                errorMessage={errors.status?.message as string}
            >
                <Controller
                    name="status"
                    control={control}
                    render={({ field }) => (
                        <div className="mt-2">
                            <Radio.Group
                                vertical
                                value={field.value}
                                onChange={field.onChange}
                            >
                                {statusOptions.map((option) => (
                                    <Radio
                                        className="items-start"
                                        key={option.value}
                                        value={option.value}
                                    >
                                        <div className="-mt-0.5">
                                            <div className="font-medium heading-text">
                                                {option.label}
                                            </div>
                                            <p className="mt-1 font-normal">
                                                {option.description}
                                            </p>
                                        </div>
                                    </Radio>
                                ))}
                            </Radio.Group>
                        </div>
                    )}
                />
            </FormItem>
        </>
    )
}

export default AccountInfoStep
