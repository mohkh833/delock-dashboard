import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import applyTheme from '@/utils/applyThemeSchema'
import presetThemeSchemaConfig from '@/configs/preset-theme-schema.config'

// Apply theme schema on mode change
const handleModeChange = (mode) => {
    applyTheme('default', mode, presetThemeSchemaConfig)
}

// Apply when schema changes
const handleSchemaChange = (schema) => {
    applyTheme(schema, 'light', presetThemeSchemaConfig)
}

// Used internally by useTheme.setSchema and useTheme.setMode
`}</SyntaxHighlighter>
    )
}

export default Example
