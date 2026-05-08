'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'QueryRouteDoc'

const demoHeader = {
    title: 'queryRoute',
    desc: 'A utility function that matches a URL path against the registered route configuration, supporting dynamic route segments.',
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
                propName: 'path',
                type: `<code>string</code>`,
                default: `-`,
                desc: 'The URL path to match against the route config (e.g. /apps/crm/customers).',
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
                component: 'Return',
                api: [
                    {
                        propName: 'route',
                        type: `<code>Route | null</code>`,
                        default: `-`,
                        desc: 'The matched route configuration object, or null if no match is found.',
                    },
                ],
            },
        ]}
    />
)

const QueryRouteDoc = () => (
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

export default QueryRouteDoc
