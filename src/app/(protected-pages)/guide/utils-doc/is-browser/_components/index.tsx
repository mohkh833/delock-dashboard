'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'IsBrowserDoc'

const demoHeader = {
    title: 'isBrowser',
    desc: 'A boolean constant that is <code>true</code> when running in a browser environment, and <code>false</code> during server-side rendering.',
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
                component: 'Return',
                api: [
                    {
                        propName: 'isBrowser',
                        type: `<code>boolean</code>`,
                        default: `-`,
                        desc: 'True when typeof window !== "undefined" and window.document exists.',
                    },
                ],
            },
        ]}
    />
)

const IsBrowserDoc = () => (
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

export default IsBrowserDoc
