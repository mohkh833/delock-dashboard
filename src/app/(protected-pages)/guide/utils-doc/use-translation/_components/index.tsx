'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'UseTranslationDoc'

const demoHeader = {
    title: 'useTranslation',
    desc: `<code>useTranslation</code> is a custom wrapper around <code>next-intl</code>'s <code>useTranslations</code>.`,
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
                propName: 'namespace',
                type: `<code>string</code>`,
                default: `-`,
                desc: 'An optional namespace to scope translations.',
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
                        propName: 't',
                        type: `<code>(key: string, values?: Record&lt;string, string | number&gt;) =&gt; string</code>`,
                        default: `-`,
                        desc: 'A translation function that returns the translated string for the given key.',
                    },
                ],
            },
        ]}
    />
)

const UseTranslationDoc = () => (
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

export default UseTranslationDoc
