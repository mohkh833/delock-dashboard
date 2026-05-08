import { NextResponse } from 'next/server'
import { generateWalletAddress } from '@/mock/data/cryptoData'

export async function GET(
    _req: Request,
    { params }: { params: Promise<{ network: string }> },
) {
    const { network } = await params
    const address = generateWalletAddress(network)
    return NextResponse.json({ address, network })
}
