'use client'

import SignUp from '@/components/auth/SignUp'
import Simple from '@/components/layouts/AuthLayout/Simple'
import Logo from '@/components/template/Logo'

const Page = () => {
    return (
        <Simple>
            <div>
                <div className="mb-8">
                    <Logo type="streamline" logoWidth={50} />
                </div>
                <SignUp signInUrl="/auth/sign-in-simple" />
            </div>
        </Simple>
    )
}

export default Page
