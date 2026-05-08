'use client'

import { Fragment } from 'react'
import Scroll from '@/components/ui/Scroll'
import Skeleton from '@/components/ui/Skeleton'
import ChatHistoryItem from './ChatHistoryItem'
import { useAiChatStore } from '../_store/aiChatStore'

type ChatHistoryProps = {
    queryText?: string
    onClick?: () => void
}

const ChatHistory = ({ queryText = '', onClick }: ChatHistoryProps) => {
    const {
        chatHistory,
        setChatHistory,
        setRenameDialog,
        setSelectedConversation,
        selectedConversation,
        initialLoading,
    } = useAiChatStore()

    const handleDelete = (id: string) => {
        setChatHistory(chatHistory.filter((item) => item.id !== id))
        setSelectedConversation('')
    }

    const handleArchive = (id: string) => {
        setChatHistory(chatHistory.filter((item) => item.id !== id))
        setSelectedConversation('')
    }

    const handleRename = (id: string, title: string) => {
        setRenameDialog({ id, title, open: true })
    }

    const handleClick = (id: string) => {
        setSelectedConversation(id)
        onClick?.()
    }

    const renderChatHistory = (timeGroup: string, queryText: string) => {
        let title = ''
        if (timeGroup === 'today') title = 'Today'
        else if (timeGroup === 'lastWeek') title = 'Last Week'
        else title = timeGroup

        return (
            <div>
                {!queryText && (
                    <div className="text-gray-400 dark:text-gray-600 px-4 uppercase font-medium text-xs mb-1">
                        {title}
                    </div>
                )}
                <div className="mb-4">
                    {chatHistory
                        .filter((item) => item.timeGroup === timeGroup)
                        .filter((item) =>
                            item.title
                                .toLowerCase()
                                .includes(queryText.toLowerCase()),
                        )
                        .map((item) => {
                            if (!item.enable) {
                                return <Fragment key={item.id} />
                            }
                            return (
                                <ChatHistoryItem
                                    key={item.id}
                                    title={item.title}
                                    conversation={item.lastConversation}
                                    active={selectedConversation === item.id}
                                    onDelete={() => handleDelete(item.id)}
                                    onArchive={() => handleArchive(item.id)}
                                    onRename={() =>
                                        handleRename(item.id, item.title)
                                    }
                                    onClick={() => handleClick(item.id)}
                                />
                            )
                        })}
                </div>
            </div>
        )
    }

    if (initialLoading) {
        return (
            <div className="flex flex-col h-full gap-6 p-4">
                {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="flex items-center gap-4">
                        <Skeleton variant="circle" height={24} width={24} />
                        <div>
                            <Skeleton height={12} width={130} />
                            <Skeleton
                                height={12}
                                width={180}
                                className="mt-2"
                            />
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    return (
        <Scroll edgeShadow className="h-full" scrollbars="vertical">
            <div className="flex flex-col gap-2 p-2 xl:max-w-[320px]">
                {renderChatHistory('today', queryText)}
                {renderChatHistory('lastWeek', queryText)}
            </div>
        </Scroll>
    )
}

export default ChatHistory
