import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useInterval from '@/utils/hooks/useInterval'

const Component = () => {

    const [count, setCount] = useState(0)
    const [isRunning, setIsRunning] = useState(true)

    const intervalRef = useInterval(() => {
        setCount((c) => c + 1)
    }, isRunning ? 1000 : null)

    return (
        <div>
            <p>Count: {count}</p>
            <button onClick={() => setIsRunning((r) => !r)}>
                {isRunning ? 'Pause' : 'Resume'}
            </button>
        </div>
    )
}
`}</SyntaxHighlighter>
    )
}

export default Example
