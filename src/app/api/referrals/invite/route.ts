import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    const { email } = await request.json()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!email || !emailRegex.test(email)) {
        return NextResponse.json(
            { success: false, message: 'Please enter a valid email address' },
            { status: 400 },
        )
    }

    return NextResponse.json({
        success: true,
        message: `Invitation sent successfully to ${email}`,
    })
}
