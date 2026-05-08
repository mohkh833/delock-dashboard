'use client'

import SignIn from '@/components/auth/SignIn'
import Simple from '@/components/layouts/AuthLayout/Simple'
import Logo from '@/components/template/Logo'

const Page = () => {
    return (
        <Simple>
            <div>
                <div className="mb-8">
                    <Logo type="streamline" logoWidth={50} />
                </div>
                <SignIn
                    signUpUrl="/auth/sign-up-simple"
                    forgetPasswordUrl="/auth/forgot-password-simple"
                />
            </div>
        </Simple>
    )
}

export default Page
