'use client'

import SignUp from '@/components/auth/SignUp'
import Centred from '@/components/layouts/AuthLayout/Centred'

const Page = () => {
    return (
        <Centred>
            <SignUp signInUrl="/auth/sign-in-centred" />
        </Centred>
    )
}

export default Page
