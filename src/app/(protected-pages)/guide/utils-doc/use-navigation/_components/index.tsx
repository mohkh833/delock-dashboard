'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'UseNavigationDoc'

const demoHeader = {
    title: 'useNavigation',
    desc: 'A hook that provides access to the navigation tree from the NavigationContext.',
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
                        propName: 'navigationTree',
                        type: `<code>NavigationTree[]</code>`,
                        default: `-`,
                        desc: 'The full navigation tree used to render the side navigation.',
                    },
                ],
            },
        ]}
    />
)

const UseNavigationDoc = () => (
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

export default UseNavigationDoc
