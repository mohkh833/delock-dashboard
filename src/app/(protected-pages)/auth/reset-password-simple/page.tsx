'use client'

import ResetPassword from '@/components/auth/ResetPassword'
import Simple from '@/components/layouts/AuthLayout/Simple'
import Logo from '@/components/template/Logo'

const Page = () => {
    return (
        <Simple>
            <div>
                <div className="mb-8">
                    <Logo type="streamline" logoWidth={50} />
                </div>
                <ResetPassword signInUrl="/auth/sign-in-simple" />
            </div>
        </Simple>
    )
}

export default Page
