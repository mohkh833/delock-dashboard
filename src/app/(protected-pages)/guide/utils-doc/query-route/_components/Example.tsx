import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import { matchRoute } from '@/utils/queryRoute'

// Exact path match
const route = matchRoute('/apps/crm/customers')
// output: { key: 'appsCrmCustomers', authority: [...], ... }

// Dynamic route match
const dynamicRoute = matchRoute('/apps/crm/customers/123')
// output: { key: 'appsCrmCustomerDetail', dynamicRoute: true, ... }

// No match
const noMatch = matchRoute('/unknown-path')
// output: null
`}</SyntaxHighlighter>
    )
}

export default Example
