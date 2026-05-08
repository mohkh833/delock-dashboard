'use client'

import SignIn from '@/components/auth/SignIn'
import Side from '@/components/layouts/AuthLayout/Side'

const Page = () => {
    return (
        <Side>
            <SignIn
                signUpUrl="/auth/sign-up-side"
                forgetPasswordUrl="/auth/forgot-password-side"
            />
        </Side>
    )
}

export default Page
