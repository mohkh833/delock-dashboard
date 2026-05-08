'use client'

import ForgotPassword from '@/components/auth/ForgotPassword'
import Centred from '@/components/layouts/AuthLayout/Centred'

const Page = () => {
    return (
        <Centred>
            <ForgotPassword signInUrl="/auth/sign-in-centred" />
        </Centred>
    )
}

export default Page
