'use client'

import ResetPassword from '@/components/auth/ResetPassword'
import Side from '@/components/layouts/AuthLayout/Side'

const Page = () => {
    return (
        <Side>
            <ResetPassword signInUrl="/auth/sign-in-side" />
        </Side>
    )
}

export default Page
