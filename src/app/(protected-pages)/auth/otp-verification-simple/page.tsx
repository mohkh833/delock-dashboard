'use client'

import OtpVerification from '@/components/auth/OtpVerification'
import Simple from '@/components/layouts/AuthLayout/Simple'
import Logo from '@/components/template/Logo'

const Page = () => {
    return (
        <Simple>
            <div>
                <div className="mb-8">
                    <Logo type="streamline" logoWidth={50} />
                </div>
                <OtpVerification />
            </div>
        </Simple>
    )
}

export default Page
