import OverflowTabs from '@/components/shared/OverflowTabs'
import classNames from '@/utils/classNames'
import { useRouter, usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

type ProjectTabProps = ComponentProps<'div'> & {
    tabListClass?: string
    className?: string
}

const ProjectTab = ({ children, tabListClass, className }: ProjectTabProps) => {
    const router = useRouter()

    const pathname = usePathname()
    const pathParts = pathname.split('/')
    const currentPath = pathParts[pathParts.length - 1]

    const handleTabChange = (value: string) => {
        router.push(`/apps/projects/${value}`)
    }

    return (
        <OverflowTabs
            value={currentPath}
            onChange={handleTabChange}
            className={classNames('flex justify-between items-end', className)}
            tabListClass={tabListClass}
            tabList={[
                { label: 'Kanban', value: 'scrumboard' },
                { label: 'Task', value: 'tasks' },
                { label: 'Timeline', value: 'timeline' },
            ]}
        >
            {children}
        </OverflowTabs>
    )
}

export default ProjectTab
