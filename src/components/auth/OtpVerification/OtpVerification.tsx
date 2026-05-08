import Alert from '@/components/ui/Alert'
import OtpVerificationForm from './components/OtpVerificationForm'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import type { OnOtpVerification } from './components/OtpVerificationForm'

type OtpVerificationBaseProps = {
    onOtpVerification?: OnOtpVerification
}

const OtpVerificationBase = ({
    onOtpVerification,
}: OtpVerificationBaseProps) => {
    const [otpVerified, setOtpVerified] = useTimeOutMessage()
    const [otpResend, setOtpResend] = useTimeOutMessage()
    const [message, setMessage] = useTimeOutMessage()

    const handleResendOtp = async () => {
        try {
            setOtpResend('We have sent you One Time Password.')
        } catch (errors) {
            setMessage?.(
                typeof errors === 'string' ? errors : 'Some error occured!',
            )
        }
    }

    return (
        <div>
            <div className="mb-8">
                <h3 className="mb-2">OTP Verification</h3>
                <p className="font-medium heading-text">
                    We have sent you One Time Password to your email.
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            {otpResend && (
                <Alert showIcon className="mb-4" type="info">
                    <span className="break-all">{otpResend}</span>
                </Alert>
            )}
            {otpVerified && (
                <Alert showIcon className="mb-4" type="success">
                    <span className="break-all">{otpVerified}</span>
                </Alert>
            )}
            <OtpVerificationForm
                setMessage={setMessage}
                setOtpVerified={setOtpVerified}
                onOtpVerification={onOtpVerification}
            />
            <div className="mt-4 text-center">
                <span className="font-semibold">Din&apos;t receive OTP? </span>
                <button
                    className="heading-text font-medium underline"
                    onClick={handleResendOtp}
                >
                    Resend OTP
                </button>
            </div>
        </div>
    )
}

export default OtpVerificationBase
