'use server'
import { chatHistoryData } from '@/mock/data/aiData'

export async function getChatHistory() {
    return chatHistoryData
}
