'use client'

import SignIn from '@/components/auth/SignIn'
import Centred from '@/components/layouts/AuthLayout/Centred'

const Page = () => {
    return (
        <Centred>
            <SignIn
                signUpUrl="/auth/sign-up-centred"
                forgetPasswordUrl="/auth/forgot-password-centred"
            />
        </Centred>
    )
}

export default Page
