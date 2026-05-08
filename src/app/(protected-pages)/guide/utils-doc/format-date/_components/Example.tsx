import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import { formatDate, formatDateTime, isValidDate } from '@/utils/formatDate'

// Default format
formatDate(new Date('2024-06-15'))
// output: 'Jun 15, 2024'

// Custom format
formatDate('2024-06-15', 'DD/MM/YYYY')
// output: '15/06/2024'

// Date and time
formatDateTime(new Date('2024-06-15T14:30:00'))
// output: 'Jun 15, 2024 14:30'

// Validate a date string
isValidDate('2024-06-15')
// output: true

isValidDate('not-a-date')
// output: false
`}</SyntaxHighlighter>
    )
}

export default Example
