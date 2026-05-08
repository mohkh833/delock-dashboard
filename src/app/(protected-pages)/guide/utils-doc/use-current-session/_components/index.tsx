'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'UseCurrentSessionDoc'

const demoHeader = {
    title: 'useCurrentSession',
    desc: 'A hook that provides access to the current user session from the authentication context.',
}

const demos = [
    {
        mdName: 'Example',
        mdPath,
        title: 'Example',
        desc: ``,
        component: <Example />,
    },
]

const extra = (
    <DemoComponentApi
        hideApiTitle
        keyText="return"
        api={[
            {
                api: [
                    {
                        propName: 'session',
                        type: `<code>Session | null</code>`,
                        default: `-`,
                        desc: 'The current session object containing user data, or null if not authenticated.',
                    },
                ],
            },
        ]}
    />
)

const UseCurrentSessionDoc = () => (
    <DemoLayout
        hideApiTitle
        hideFooter
        innerFrame={false}
        header={demoHeader}
        demos={demos}
        mdPrefixPath="utils"
        extra={extra}
        keyText="param"
    />
)

export default UseCurrentSessionDoc
