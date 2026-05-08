import { NextResponse } from 'next/server'
import { searchQueryPoolData } from '@/mock/data/commonData'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type SearchItem = Record<string, any> & { type: string }

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const query = searchParams.get('query') || ''
    const searchQuery = query.toLowerCase()

    const result = (searchQueryPoolData as SearchItem[]).filter((item) => {
        if (item.type === 'user' || item.type === 'companies') {
            return (
                item.name.toLowerCase().includes(searchQuery) ||
                item.email.toLowerCase().includes(searchQuery)
            )
        }
        if (item.type === 'quickAction' || item.type === 'files') {
            return item.title.toLowerCase().includes(searchQuery)
        }
        return false
    })

    const typeToTitle: Record<string, string> = {
        user: 'People',
        companies: 'Companies',
        quickAction: 'Quick Actions',
        files: 'Files',
    }

    const types = [...new Set(result.map((item) => item.type))]

    const data = types.map((type) => ({
        title: typeToTitle[type] || type,
        data: result.filter((item) => item.type === type).slice(0, 5),
    }))

    return NextResponse.json(data)
}
