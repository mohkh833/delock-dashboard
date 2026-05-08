export type Customer = {
    id: string
    name: string
    firstName: string
    lastName: string
    email: string
    img: string
    role: string[]
    lastOnline: string
    status: string
    title: string
    location: string
    address: {
        addressLine1: string
        city: string
        state: string
        postalCode: string
        country: string
    }
    dialCode: string
    birthday: string
    phoneNumber: string
    totalSpending: number
    tags: string[]
    permissionRole: string
}

export type CustomerStatistic = Record<
    string,
    {
        value: number
        trend: string
        growthData: {
            name: string
            value: number
        }[]
    }
>

export type GetCustomersListResponse = {
    list: Customer[]
    total: number
}
