'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'UseMenuActiveDoc'

const demoHeader = {
    title: 'useMenuActive',
    desc: 'useMenuActive helps to get navigation meta related with current route.',
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
                propName: 'navTree',
                type: `<code>NavigationTree[]</code>`,
                default: `-`,
                desc: 'Nav config tree',
            },
            {
                propName: 'key',
                type: `<code>string</code>`,
                default: `-`,
                desc: 'Current route key',
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
                        propName: 'activedRoute',
                        type: `<code>NavigationTree</code>`,
                        default: `-`,
                        desc: 'NavigationTree that paired with current route key',
                    },
                    {
                        propName: 'includedRouteTree',
                        type: `<code>NavigationTree</code>`,
                        default: `-`,
                        desc: 'Root NavigationTree that included current route key',
                    },
                ],
            },
        ]}
    />
)

const UseMenuActiveDoc = () => (
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

export default UseMenuActiveDoc
