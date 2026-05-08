import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useDebounce from '@/utils/hooks/useDebounce'

const Component = () => {

    const debouncedSearch = useDebounce((value) => {
        // perform search
        console.log('Searching for:', value)
    }, 500)

    return (
        <input
            onChange={(e) => debouncedSearch(e.target.value)}
            placeholder="Search..."
        />
    )
}
`}</SyntaxHighlighter>
    )
}

export default Example
