import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useTranslation from '@/utils/hooks/useTranslation'

const Example = () => {
    const t = useTranslation()

    return (
        <div>
            <p>{t('hello')}</p>
        </div>
    );
};

export default Example
`}</SyntaxHighlighter>
    )
}

export default Example
