import { BsBanFill, BsArchiveFill, BsCheckCircleFill } from 'react-icons/bs'
import { MdOutlineTimelapse } from 'react-icons/md'
import type { ReactNode } from 'react'

export const statusMap: Record<
    string,
    { color: string; label: string; icon: ReactNode }
> = {
    active: {
        label: 'Active',
        color: 'text-info',
        icon: <MdOutlineTimelapse className="text-base" />,
    },
    onHold: {
        label: 'On Hold',
        color: 'text-error',
        icon: <BsBanFill />,
    },
    archived: {
        label: 'Archived',
        color: 'text-warning',
        icon: <BsArchiveFill />,
    },
    completed: {
        label: 'Completed',
        color: 'text-success',
        icon: <BsCheckCircleFill />,
    },
}
