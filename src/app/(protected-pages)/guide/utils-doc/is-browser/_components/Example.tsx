import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import isBrowser from '@/utils/isBrowser'

// Safe to access browser APIs
if (isBrowser) {
    window.localStorage.setItem('key', 'value')
}

// Useful in utility functions that run on both server and client
const getWindowWidth = () => {
    if (!isBrowser) return 0
    return window.innerWidth
}
`}</SyntaxHighlighter>
    )
}

export default Example
