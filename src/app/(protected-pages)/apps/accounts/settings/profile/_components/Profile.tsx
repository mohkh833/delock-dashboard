'use client'

import { useEffect, useMemo } from 'react'
import { Form } from '@/components/ui/Form'
import Avatar from '@/components/ui/Avatar'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Upload from '@/components/ui/Upload'
import Button from '@/components/ui/Button'
import SelectInputWithPrefix from '@/components/shared/SelectInputWithPrefix'
import SelectOptionWithPrefix from '@/components/shared/SelectOptionWithPrefix'
import FormFieldWrapper from '../../_components/FormFieldWrapper'
import { countryList } from '@/constants/countries.constant'
import { apiGetSettingsProfile } from '@/services/client/AccountService'
import sleep from '@/utils/sleep'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import useSWR from 'swr'
import type { GetSettingsProfileResponse } from '../../types'

type FormSchema = {
    name: string
    email: string
    img: string
    phoneNumber: string
    dialCode: string
    language: string
    title?: string
    timezone: string
}

const validationSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required'),
    img: z.string().min(1, 'Image is required'),
    phoneNumber: z.string().min(1, 'Phone number is required'),
    dialCode: z.string().min(1, 'Dial code is required'),
    language: z.string().min(1, 'Language is required'),
    title: z.string().optional(),
    timezone: z.string().min(1, 'Time zone is required'),
})

const AVATAR_SIZE = 60

const languageList = [
    { label: 'English', value: 'en', img: 'US' },
    { label: 'Chinese', value: 'zh', img: 'CN' },
    { label: 'Espanol', value: 'es', img: 'ES' },
    { label: 'Arabic', value: 'ar', img: 'SA' },
]

const timezoneList = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time (US & Canada)' },
    { value: 'America/Los_Angeles', label: 'Pacific Time (US & Canada)' },
    { value: 'Europe/London', label: 'Greenwich Mean Time (UK)' },
    { value: 'Europe/Paris', label: 'Central European Time' },
    { value: 'Asia/Tokyo', label: 'Japan Standard Time' },
    { value: 'Asia/Shanghai', label: 'China Standard Time' },
    { value: 'Asia/Singapore', label: 'Singapore Time' },
    { value: 'Asia/Kuala_Lumpur', label: 'Malaysia Time' },
    { value: 'Australia/Sydney', label: 'Australian Eastern Time' },
]

type ProfileProps = {
    initialData: GetSettingsProfileResponse
}

const Profile = ({ initialData }: ProfileProps) => {
    const { data } = useSWR(
        '/api/settings/profile',
        apiGetSettingsProfile<GetSettingsProfileResponse>,
        {
            fallbackData: initialData,
            revalidateOnFocus: false,
            revalidateIfStale: false,
        },
    )

    const {
        control,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<FormSchema>({
        resolver: zodResolver(validationSchema),
    })

    const dialCodeList = useMemo(() => {
        const newCountryList: Array<{
            value: string
            dialCode: string
            label: string
        }> = JSON.parse(JSON.stringify(countryList))
        return newCountryList.map((country) => ({
            value: country.dialCode,
            label: country.dialCode,
            img: country.value,
        }))
    }, [])

    useEffect(() => {
        if (data) {
            reset(data)
        }
    }, [data, reset])

    const beforeUpload = (files: FileList | null) => {
        let valid: string | boolean = true
        const allowedFileType = ['image/jpeg', 'image/png']
        if (files) {
            for (const file of files) {
                if (!allowedFileType.includes(file.type)) {
                    valid = 'Please upload a .jpeg or .png file!'
                }
            }
        }
        return valid
    }

    const handleFormSubmit = async (values: FormSchema) => {
        await sleep(1000)
        console.log('Form submitted with values:', values)
    }

    return (
        <Form onSubmit={handleSubmit(handleFormSubmit)}>
            <div className="space-y-4">
                <div className="py-4">
                    <div className="mb-4">
                        <h5>Basic Information</h5>
                        <p>Edit your name, email, and contact details.</p>
                    </div>
                    <div>
                        <FormFieldWrapper
                            label="Name"
                            error={errors.name?.message}
                        >
                            <Controller
                                name="name"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Enter your name"
                                        {...field}
                                    />
                                )}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper
                            label="Email"
                            error={errors.email?.message}
                        >
                            <Controller
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        type="email"
                                        placeholder="Enter your email"
                                        {...field}
                                    />
                                )}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper
                            label="Image"
                            error={errors.img?.message}
                        >
                            <Controller
                                name="img"
                                control={control}
                                render={({ field }) => (
                                    <>
                                        <div className="flex items-center gap-4">
                                            <Avatar
                                                src={field?.value}
                                                size={AVATAR_SIZE}
                                                shape="circle"
                                                alt="Upload image"
                                            />
                                            <Upload
                                                showList={false}
                                                uploadLimit={1}
                                                beforeUpload={beforeUpload}
                                                onChange={(files) => {
                                                    field.onChange(
                                                        URL.createObjectURL(
                                                            files,
                                                        ),
                                                    )
                                                }}
                                            >
                                                <div>
                                                    <Button type="button">
                                                        Upload
                                                    </Button>
                                                </div>
                                            </Upload>
                                        </div>
                                    </>
                                )}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper
                            label="Job title"
                            error={errors.title?.message}
                        >
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        placeholder="Enter your job title"
                                        {...field}
                                    />
                                )}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper
                            label="Phone number"
                            error={errors.dialCode?.message}
                            border={false}
                        >
                            <div className="flex gap-2">
                                <Controller
                                    name="dialCode"
                                    control={control}
                                    render={({ field }) => (
                                        <Select
                                            isSearchable
                                            options={dialCodeList}
                                            onChange={(option) =>
                                                field.onChange(option?.value)
                                            }
                                            value={dialCodeList.find(
                                                (option) =>
                                                    option.value ===
                                                    field.value,
                                            )}
                                            className="min-w-[150px]"
                                            placeholder="Dial code"
                                            customInputDisplay={(
                                                selectedItem,
                                            ) => (
                                                <SelectInputWithPrefix
                                                    label={selectedItem?.label}
                                                    showPrefix={Boolean(
                                                        selectedItem?.value,
                                                    )}
                                                    prefix={
                                                        selectedItem && (
                                                            <Image
                                                                src={`/img/countries/${selectedItem?.img}.png`}
                                                                className="rounded-full"
                                                                alt={
                                                                    selectedItem?.label
                                                                }
                                                                width={16}
                                                                height={16}
                                                            />
                                                        )
                                                    }
                                                />
                                            )}
                                            customOption={({
                                                option,
                                                selected,
                                                CheckIcon,
                                            }) => (
                                                <SelectOptionWithPrefix
                                                    selected={selected}
                                                    checkIcon={CheckIcon}
                                                    label={option?.label}
                                                    prefix={
                                                        <Image
                                                            src={`/img/countries/${option?.img}.png`}
                                                            className="rounded-full"
                                                            alt={option?.label}
                                                            width={16}
                                                            height={16}
                                                        />
                                                    }
                                                />
                                            )}
                                            searchInputProps={{
                                                placeholder: 'Search...',
                                            }}
                                        />
                                    )}
                                />
                                <Controller
                                    name="phoneNumber"
                                    control={control}
                                    render={({ field }) => (
                                        <Input
                                            placeholder="Enter your phone"
                                            {...field}
                                        />
                                    )}
                                />
                            </div>
                        </FormFieldWrapper>
                    </div>
                </div>
                <div className="py-4">
                    <div className="mb-4">
                        <h5>Preference</h5>
                        <p>Set your language and timezone.</p>
                    </div>
                    <div>
                        <FormFieldWrapper
                            label="Language"
                            error={errors.language?.message}
                        >
                            <Controller
                                name="language"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        options={languageList}
                                        onChange={(option) =>
                                            field.onChange(option?.value)
                                        }
                                        value={languageList.find(
                                            (option) =>
                                                option.value === field.value,
                                        )}
                                        placeholder="Select language"
                                        customInputDisplay={(selectedItem) => (
                                            <SelectInputWithPrefix
                                                label={selectedItem?.label}
                                                showPrefix={Boolean(
                                                    selectedItem?.value,
                                                )}
                                                prefix={
                                                    selectedItem && (
                                                        <Image
                                                            src={`/img/countries/${selectedItem?.img}.png`}
                                                            width={16}
                                                            height={16}
                                                            className="rounded-full"
                                                            alt={
                                                                selectedItem?.label
                                                            }
                                                        />
                                                    )
                                                }
                                            />
                                        )}
                                        customOption={({
                                            option,
                                            selected,
                                            CheckIcon,
                                        }) => (
                                            <SelectOptionWithPrefix
                                                selected={selected}
                                                checkIcon={CheckIcon}
                                                label={option?.label}
                                                prefix={
                                                    <Image
                                                        src={`/img/countries/${option?.img}.png`}
                                                        width={16}
                                                        height={16}
                                                        className="rounded-full"
                                                        alt={option?.label}
                                                    />
                                                }
                                            />
                                        )}
                                    />
                                )}
                            />
                        </FormFieldWrapper>
                        <FormFieldWrapper
                            label="Timezone"
                            error={errors.timezone?.message}
                            border={false}
                        >
                            <Controller
                                name="timezone"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        options={timezoneList}
                                        onChange={(option) =>
                                            field.onChange(option?.value)
                                        }
                                        value={timezoneList.find(
                                            (option) =>
                                                option.value === field.value,
                                        )}
                                        placeholder="Select timezone"
                                    />
                                )}
                            />
                        </FormFieldWrapper>
                    </div>
                </div>
                <div className="py-4 flex items-center justify-end gap-2">
                    <Button type="reset" onClick={() => reset()}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        variant="solid"
                        loading={isSubmitting}
                    >
                        {isSubmitting ? 'Saving...' : 'Save'}
                    </Button>
                </div>
            </div>
        </Form>
    )
}

export default Profile
