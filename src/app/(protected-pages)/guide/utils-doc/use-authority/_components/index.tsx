'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'UseAuthorityDoc'

const demoHeader = {
    title: 'useAuthority',
    desc: 'A hook that checks whether a user has the required authority to access a resource.',
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

const demoApi = [
    {
        component: 'Params',
        api: [
            {
                propName: 'userAuthority',
                type: `<code>string[]</code>`,
                default: `<code>[]</code>`,
                desc: "The user's current roles.",
            },
            {
                propName: 'authority',
                type: `<code>string[]</code>`,
                default: `<code>[]</code>`,
                desc: 'The roles required to access the resource.',
            },
            {
                propName: 'emptyCheck',
                type: `<code>boolean</code>`,
                default: `<code>false</code>`,
                desc: 'If true, returns false when either authority array is empty.',
            },
        ],
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
                        propName: 'authorized',
                        type: `<code>boolean</code>`,
                        default: `-`,
                        desc: 'Whether the user has at least one matching role.',
                    },
                ],
            },
        ]}
    />
)

const UseAuthorityDoc = () => (
    <DemoLayout
        hideApiTitle
        hideFooter
        innerFrame={false}
        header={demoHeader}
        demos={demos}
        api={demoApi}
        mdPrefixPath="utils"
        extra={extra}
        keyText="param"
    />
)

export default UseAuthorityDoc
