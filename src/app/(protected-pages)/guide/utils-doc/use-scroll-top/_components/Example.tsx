import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useScrollTop from '@/utils/hooks/useScrollTop'

const Component = () => {

    const { isSticky } = useScrollTop()

	return (...)
}
`}</SyntaxHighlighter>
    )
}

export default Example
