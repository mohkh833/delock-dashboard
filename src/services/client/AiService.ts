import ApiService from './ApiService'

export async function apiPostChat<T>(data: {
    prompt: string
    attachments?: File[]
}) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/ai/chat',
        method: 'post',
        data,
    })
}

export async function apiGetChatHistory<T>() {
    return ApiService.fetchDataWithAxios<T>({
        url: '/ai/chat/history',
        method: 'get',
    })
}

export async function apiPostImages<T>(data: { prompt: string }) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/ai/image',
        method: 'post',
        data,
    })
}

export async function apiPostWriter<T, U extends Record<string, unknown>>(
    data: U,
) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/ai/writer',
        method: 'post',
        data,
    })
}

export async function apiPostWriterAmend<T>(data: {
    prompt: string
    selectedText: string
}) {
    return ApiService.fetchDataWithAxios<T>({
        url: '/ai/writer/amend',
        method: 'post',
        data,
    })
}
