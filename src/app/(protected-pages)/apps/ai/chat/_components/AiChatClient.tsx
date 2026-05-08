'use client'

import { useEffect } from 'react'
import { startTransition } from 'react'
import ChatView from './ChatView'
import ChatSideNav from './ChatSideNav'
import ChatHistoryRenameDialog from './ChatHistoryRenameDialog'
import { useAiChatStore } from '../_store/aiChatStore'
import type { ChatHistories } from '../types'

type AiChatClientProps = {
    initialChatHistory: ChatHistories
}

const AiChatClient = ({ initialChatHistory }: AiChatClientProps) => {
    const { setChatHistory } = useAiChatStore()

    useEffect(() => {
        startTransition(() => {
            setChatHistory(initialChatHistory)
        })
    }, [initialChatHistory, setChatHistory])

    return (
        <div className="flex flex-auto gap-4 h-full">
            <ChatView />
            <ChatSideNav className="hidden xl:block" />
            <ChatHistoryRenameDialog />
        </div>
    )
}

export default AiChatClient
