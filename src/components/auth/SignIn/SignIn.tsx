import Alert from '@/components/ui/Alert'
import SignInForm from './components/SignInForm'
import OauthSignIn from './components/OauthSignIn'
import ActionLink from '@/components/shared/ActionLink'
import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'
import type { OnSignIn } from './components/SignInForm'
import type { OnOauthSignIn } from './components/OauthSignIn'

type SignInProps = {
    signUpUrl?: string
    forgetPasswordUrl?: string
    onSignIn?: OnSignIn
    onOauthSignIn?: OnOauthSignIn
}

const SignIn = ({
    signUpUrl = '/sign-up',
    forgetPasswordUrl = '/forgot-password',
    onSignIn,
    onOauthSignIn,
}: SignInProps) => {
    const [message, setMessage] = useTimeOutMessage()

    return (
        <>
            <div className="mb-10">
                <h3 className="mb-2">Welcome back!</h3>
                <p className="heading-text">
                    Please enter your credentials to sign in!
                </p>
            </div>
            {message && (
                <Alert showIcon className="mb-4" type="danger">
                    <span className="break-all">{message}</span>
                </Alert>
            )}
            <SignInForm
                setMessage={setMessage}
                passwordHint={
                    <div className="mb-7 mt-2">
                        <ActionLink
                            href={forgetPasswordUrl}
                            className="font-medium heading-text mt-2 underline"
                            themeColor={false}
                        >
                            Forgot password
                        </ActionLink>
                    </div>
                }
                onSignIn={onSignIn}
            />
            <div className="mt-8">
                <div className="flex items-center gap-2 mb-6">
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                    <p className="font-medium heading-text">or continue with</p>
                    <div className="border-t border-gray-200 dark:border-gray-800 flex-1 mt-[1px]" />
                </div>
                <OauthSignIn
                    setMessage={setMessage}
                    onOauthSignIn={onOauthSignIn}
                />
            </div>
            <div>
                <div className="mt-6 text-center">
                    <span>{`Don't have an account yet?`} </span>
                    <ActionLink
                        href={signUpUrl}
                        className="heading-text font-medium"
                        themeColor={false}
                    >
                        Sign up
                    </ActionLink>
                </div>
            </div>
        </>
    )
}

export default SignIn
