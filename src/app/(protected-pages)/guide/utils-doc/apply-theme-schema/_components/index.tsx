'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'ApplyThemeSchemaDoc'

const demoHeader = {
    title: 'applyThemeSchema',
    desc: 'A function that applies theme CSS custom properties to the document root based on the given schema and color mode.',
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
                propName: 'theme',
                type: `<code>string</code>`,
                default: `-`,
                desc: 'The theme schema key from the preset config.',
            },
            {
                propName: 'mode',
                type: `<code>Mode</code>`,
                default: `-`,
                desc: 'The current color mode (light or dark).',
            },
            {
                propName: 'presetThemeSchemaConfig',
                type: `<code>ThemeSchemaConfig</code>`,
                default: `-`,
                desc: 'The full preset theme schema configuration object.',
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
                        propName: 'void',
                        type: `<code>void</code>`,
                        default: `-`,
                        desc: 'Sets --primary, --primary-deep, --primary-mild, --primary-subtle, --muted CSS variables on document.documentElement.',
                    },
                ],
            },
        ]}
    />
)

const ApplyThemeSchemaDoc = () => (
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

export default ApplyThemeSchemaDoc
