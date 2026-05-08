import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useTheme from '@/utils/hooks/useTheme'

const Component = () => {

    const mode = useTheme((s) => s.mode)
    const themeSchema = useTheme((s) => s.themeSchema)
    const setMode = useTheme((s) => s.setMode)
    const setSchema = useTheme((s) => s.setSchema)

    return (
        <div>
            <p>Current mode: {mode}</p>
            <button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
                Toggle mode
            </button>
        </div>
    )
}
`}</SyntaxHighlighter>
    )
}

export default Example
