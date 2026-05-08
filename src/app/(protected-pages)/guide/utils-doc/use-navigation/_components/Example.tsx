import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useNavigation from '@/utils/hooks/useNavigation'

const Component = () => {

    const { navigationTree } = useNavigation()

    return (
        <div>
            {navigationTree.map((nav) => (
                <div key={nav.key}>{nav.title}</div>
            ))}
        </div>
    )
}
`}</SyntaxHighlighter>
    )
}

export default Example
