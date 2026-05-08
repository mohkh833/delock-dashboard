'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import Checkbox from '@/components/ui/Checkbox'
import Card from '@/components/ui/Card'
import Collapsible from '@/components/ui/Collapsible'
import SettingsHeader from '../../_components/SettingsHeader'
import { notificationCategorys } from '../../utils'
import {
    LiCalendar,
    LiProfiles,
    LiShield,
    LiRocket,
    LiDollarSquare,
    LiChevronDown,
    LiChevronUp,
} from '@/icons'
import type { Settings, Member } from '../../types'

type NotificationProps = {
    initialData: Settings & {
        allMembers: Member[]
        participantMembers: Member[]
        invitedMembers: Member[]
    }
}

const iconMap: Record<string, React.ReactNode> = {
    project: <LiCalendar />,
    team: <LiProfiles />,
    security: <LiShield />,
    deployment: <LiRocket />,
    billing: <LiDollarSquare />,
}

const Notification = ({ initialData }: NotificationProps) => {
    const [data, setData] = useState(initialData)
    const [expanded, setExpanded] = useState<string[]>([
        'project',
        'team',
        'security',
        'deployment',
        'billing',
    ])

    const handleCheckboxChange = (
        categoryId: string,
        eventId: string,
        checked: string[],
    ) => {
        setData((prev) => ({
            ...prev,
            notification: {
                ...prev.notification,
                list: prev.notification.list.map((category) =>
                    category.id === categoryId
                        ? {
                              ...category,
                              events: category.events.map((event) =>
                                  event.id === eventId
                                      ? { ...event, enabled: checked }
                                      : event,
                              ),
                          }
                        : category,
                ),
            },
        }))
    }

    return (
        <div className="space-y-4">
            <SettingsHeader
                title="Notifications"
                description="Choose how you want to be notified"
            />
            <div>
                <Card bodyClass="p-0 divide-y divide-gray-200 dark:divide-gray-800">
                    {data.notification.list.map((category) => (
                        <Collapsible
                            key={category.id}
                            open={expanded.includes(category.id)}
                            className="p-4"
                        >
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    {iconMap[category.id] && (
                                        <span className="heading-text text-xl">
                                            {iconMap[category.id]}
                                        </span>
                                    )}
                                    <h5>
                                        {
                                            notificationCategorys[category.id]
                                                ?.title
                                        }
                                    </h5>
                                </div>
                                <div>
                                    {expanded.includes(category.id) ? (
                                        <Button
                                            variant="subtle"
                                            className="w-6 h-6"
                                            icon={<LiChevronUp />}
                                            size="sm"
                                            onClick={() =>
                                                setExpanded(
                                                    expanded.filter(
                                                        (id) =>
                                                            id !== category.id,
                                                    ),
                                                )
                                            }
                                        />
                                    ) : (
                                        <Button
                                            variant="subtle"
                                            className="w-6 h-6"
                                            icon={<LiChevronDown />}
                                            size="sm"
                                            onClick={() =>
                                                setExpanded([
                                                    ...expanded,
                                                    category.id,
                                                ])
                                            }
                                        />
                                    )}
                                </div>
                            </div>
                            <Collapsible.Content>
                                <div className="space-y-4 mt-4">
                                    {category.events.map((event) => (
                                        <div
                                            key={event.id}
                                            className="flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                                        >
                                            <div>
                                                <div className="heading-text font-medium">
                                                    {event.title}
                                                </div>
                                                <div>{event.description}</div>
                                            </div>
                                            <div>
                                                <Checkbox.Group
                                                    value={event.enabled}
                                                    onChange={(value) =>
                                                        handleCheckboxChange(
                                                            category.id,
                                                            event.id,
                                                            value,
                                                        )
                                                    }
                                                >
                                                    <Checkbox value="email">
                                                        Mail
                                                    </Checkbox>
                                                    <Checkbox value="in-app">
                                                        In App
                                                    </Checkbox>
                                                    <Checkbox value="sms">
                                                        SMS
                                                    </Checkbox>
                                                </Checkbox.Group>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </Collapsible.Content>
                        </Collapsible>
                    ))}
                </Card>
            </div>
        </div>
    )
}

export default Notification
