'use client'

import Card from '@/components/ui/Card'
import Avatar from '@/components/ui/Avatar'
import Progress from '@/components/ui/Progress'
import Tag from '@/components/ui/Tag'
import Badge from '@/components/ui/Badge'
import Tooltip from '@/components/ui/Tooltip'
import Divider from '@/components/shared/Divider'
import UsersAvatarGroup from '@/components/shared/UsersAvatarGroup'
import ActionDropdown from './ActionDropdown'
import { LiTask } from '@/icons'
import { priorityMap, progressColor, statusMap } from '../utils'
import { TbStar, TbStarFilled } from 'react-icons/tb'
import Link from 'next/link'
import classNames from '@/utils/classNames'
import type { Project } from '../_store/useProjectListStore'

type GridViewProps = {
    data: Project[]
    onDelete: (id: string) => void
    onToggleFavorite: (id: string) => void
    onChangeStatus: (id: string, status: string) => void
}

const GridView = ({
    data,
    onDelete,
    onToggleFavorite,
    onChangeStatus,
}: GridViewProps) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {data.map((project) => (
                <Card
                    key={project.id}
                    bodyClass="flex flex-col justify-between h-full"
                    className="shadow-lg"
                >
                    <div className="flex justify-between">
                        <div className="flex gap-2">
                            <Avatar
                                src={project.img}
                                size={25}
                                className="text-white border-0"
                            />
                            <h6 className="mb-1 font-semibold hover:underline mt-0.5">
                                <Link href={`/apps/projects/${project.id}`}>
                                    {project.name}
                                </Link>
                            </h6>
                        </div>
                        <div className="flex gap-2">
                            <Tooltip
                                title={
                                    project.favorite
                                        ? 'Remove from favorite'
                                        : 'Mark as favorite'
                                }
                            >
                                <button
                                    className="w-6 h-6 flex items-center justify-center text-yellow-500 text-lg"
                                    onClick={() => onToggleFavorite(project.id)}
                                >
                                    {project.favorite ? (
                                        <TbStarFilled />
                                    ) : (
                                        <TbStar />
                                    )}
                                </button>
                            </Tooltip>
                            <ActionDropdown
                                status={project.status}
                                onChangeStatus={(status) =>
                                    onChangeStatus(project.id, status)
                                }
                                onDelete={() => onDelete(project.id)}
                            />
                        </div>
                    </div>
                    <div className="mt-2 space-y-2">
                        <p>{project.description}</p>
                        <div className="heading-text font-medium">
                            <Progress
                                className="w-auto"
                                width={19}
                                size="sm"
                                percent={project.progress}
                                strokeClass={progressColor(project.progress)}
                            />
                        </div>
                        <div className="flex justify-between">
                            <div className="flex items-center">
                                <div className="flex items-center gap-1 cursor-pointer">
                                    <Tooltip
                                        title={statusMap[project.status]?.label}
                                    >
                                        <span
                                            className={classNames(
                                                statusMap[project.status]
                                                    ?.color,
                                            )}
                                        >
                                            {statusMap[project.status]?.icon}
                                        </span>
                                    </Tooltip>
                                </div>
                                <Divider
                                    orientation="vertical"
                                    className="min-h-3"
                                />
                                <div className="flex items-center gap-1">
                                    <LiTask className="text-base" />
                                    <span className="heading-text leading-none">
                                        {project.tasks.completed}/
                                        {project.tasks.total}
                                    </span>
                                </div>
                                <Divider
                                    orientation="vertical"
                                    className="min-h-3"
                                />
                                <Tag className="py-0.5 px-1 flex items-center gap-1 bg-transparent">
                                    <Badge
                                        className={classNames(
                                            'w-2.5 h-2.5',
                                            priorityMap[project.priority]
                                                ?.color,
                                        )}
                                    />
                                    <span>{project.priority}</span>
                                </Tag>
                            </div>
                            <UsersAvatarGroup
                                avatarGroupProps={{ className: 'flex' }}
                                users={project.members}
                                avatarProps={{ size: 22 }}
                            />
                        </div>
                    </div>
                </Card>
            ))}
        </div>
    )
}

export default GridView
