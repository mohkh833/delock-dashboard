import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useTimeOutMessage from '@/utils/hooks/useTimeOutMessage'

const Component = () => {

    const [message, setMessage] = useTimeOutMessage()

    const handleAction = async () => {
        try {
            await someAsyncOperation()
            setMessage('Operation successful!')
        } catch (error) {
            setMessage('Something went wrong.')
        }
    }

    return (
        <div>
            {message && <p>{message}</p>}
            <button onClick={handleAction}>Perform Action</button>
        </div>
    )
}
`}</SyntaxHighlighter>
    )
}

export default Example
