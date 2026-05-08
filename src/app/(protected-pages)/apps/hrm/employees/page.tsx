import { getHrmEmployeesInitialData } from '@/server/actions/hrm'
import Employees from './_components/Employees'

export default async function EmployeesPage(props: {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
    const searchParams = await props.searchParams

    const pageIndex = Number(searchParams.pageIndex) || 1
    const pageSize = Number(searchParams.pageSize) || 20
    const query = (searchParams.query as string) || ''
    const sortKey = (searchParams.sortKey as string) || ''
    const sortOrder = (searchParams.sortOrder as string) || 'asc'
    const status = (searchParams.status as string) || 'active'
    const employmentTypes = (searchParams.employmentTypes as string) || ''
    const departments = (searchParams.departments as string) || ''
    const roles = (searchParams.roles as string) || ''

    const initialData = await getHrmEmployeesInitialData({
        pageIndex,
        pageSize,
        query,
        sortKey,
        sortOrder,
        status,
        employmentTypes,
        departments,
        roles,
    })

    return <Employees data={initialData} />
}
