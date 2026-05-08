'use client'

import ResetPassword from '@/components/auth/ResetPassword'
import Centred from '@/components/layouts/AuthLayout/Centred'

const Page = () => {
    return (
        <Centred>
            <ResetPassword signInUrl="/auth/sign-in-centred" />
        </Centred>
    )
}

export default Page
