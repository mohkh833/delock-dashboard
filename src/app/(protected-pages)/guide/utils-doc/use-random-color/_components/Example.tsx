import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useRandomColor from '@/utils/hooks/useRandomColor'

const Component = ({ name }) => {

    const { generateColor } = useRandomColor()

    const { background, text } = generateColor(name)

    return (
        <div className={\`\${background} \${text} px-2 py-1 rounded\`}>
            {name}
        </div>
    )
}
`}</SyntaxHighlighter>
    )
}

export default Example
