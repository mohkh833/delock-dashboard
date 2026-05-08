'use client'

import ForgotPassword from '@/components/auth/ForgotPassword'
import Side from '@/components/layouts/AuthLayout/Side'

const Page = () => {
    return (
        <Side>
            <ForgotPassword signInUrl="/auth/sign-in-side" />
        </Side>
    )
}

export default Page
