import { getProjectAuditLog } from '@/server/actions/projects'
import AuditLog from './_components/AuditLog'

export default async function AuditLogPage() {
    const initialData = await getProjectAuditLog({ pageIndex: 1, pageSize: 10 })
    return <AuditLog initialData={initialData} />
}
