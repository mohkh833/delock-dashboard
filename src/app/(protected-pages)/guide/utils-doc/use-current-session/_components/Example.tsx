import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useCurrentSession from '@/utils/hooks/useCurrentSession'

const Component = () => {

    const { session } = useCurrentSession()

    return (
        <>
            {session && (
                <div>
                    <h6>Welcome, {session.user?.name}</h6>
                    <div>{session.user?.email}</div>
                </div>
            )}
        </>
    )
}
`}</SyntaxHighlighter>
    )
}

export default Example
