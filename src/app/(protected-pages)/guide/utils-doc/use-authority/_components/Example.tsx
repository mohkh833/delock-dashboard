import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useAuthority from '@/utils/hooks/useAuthority'

const Component = ({ userAuthority }) => {

    const hasAccess = useAuthority(userAuthority, ['ADMIN', 'USER'])

    return (
        <>
            {hasAccess && (
                <div>Protected content</div>
            )}
        </>
    )
}
`}</SyntaxHighlighter>
    )
}

export default Example
