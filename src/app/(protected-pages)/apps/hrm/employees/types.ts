export type EmployeeStatus = 'active' | 'inactive' | 'terminated'
export type EmploymentType =
    | 'full-time'
    | 'part-time'
    | 'contract'
    | 'intern'
    | 'freelance'
export type Gender = 'male' | 'female' | 'other' | 'prefer-not-to-say'
export type CurrentStatus = 'working' | 'away' | 'on-leave'

export type Address = {
    addressLine1: string
    addressLine2?: string
    city: string
    state: string
    postalCode: string
    country: string
}

export type EmployeeDocument = {
    id: string
    name: string
    type: string
    url: string
    uploadedAt: string
    uploadedBy: string
}

export type Employee = {
    id: string
    employeeId: string
    personalInfo: {
        firstName: string
        lastName: string
        fullName: string
        email: string
        phone: string
        gender: Gender
        dateOfBirth: string
        profilePhoto?: string
        address?: Address
    }
    jobInfo: {
        department: string
        designation: string
        role: string
        employmentType: EmploymentType
        joiningDate: string
        reportingManager?: string
        workLocation?: string
    }
    accountInfo: {
        loginEmail: string
        status: EmployeeStatus
        currentStatus: CurrentStatus
        lastLogin?: string
        permissions?: string[]
        createdBy: string
        updatedBy: string
    }
    compensation?: {
        baseSalary: number
        currency: string
        bonus?: number
        allowances?: number
        deductions?: number
        effectiveDate: string
    }
    documents?: EmployeeDocument[]
    createdAt: string
    updatedAt: string
}

export type GetEmployeesResponse = {
    employees: Employee[]
    total: number
}

export type Department = {
    id: string
    name: string
    description?: string
    parentDepartment?: string
    roles: Role[]
}

export type Role = {
    id: string
    name: string
    department: string
    level: 'junior' | 'mid' | 'senior' | 'lead' | 'manager'
    permissions?: string[]
}

export type EmployeeFormData = {
    firstName: string
    lastName: string
    email: string
    phone: string
    gender: string
    dateOfBirth: string
    profilePhoto?: File
    documents?: (File | EmployeeDocument)[]
    department: string
    designation: string
    employmentType: string
    joiningDate: string
    reportingManager?: string
    workLocation?: string
    employeeId: string
    loginEmail: string
    status: string
}
