'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'UseThemeDoc'

const demoHeader = {
    title: 'useTheme',
    desc: 'A hook that provides access to the current theme state and methods to update it via a selector function.',
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
                        propName: 'themeSchema',
                        type: `<code>string</code>`,
                        default: `-`,
                        desc: 'Current active theme schema key.',
                    },
                    {
                        propName: 'mode',
                        type: `<code>Mode</code>`,
                        default: `-`,
                        desc: 'Current color mode (light or dark).',
                    },
                    {
                        propName: 'direction',
                        type: `<code>Direction</code>`,
                        default: `-`,
                        desc: 'Current layout direction (ltr or rtl).',
                    },
                    {
                        propName: 'panelExpand',
                        type: `<code>boolean</code>`,
                        default: `-`,
                        desc: 'Whether the panel is expanded.',
                    },
                    {
                        propName: 'setSchema',
                        type: `<code>(schema: string) =&gt; void</code>`,
                        default: `-`,
                        desc: 'Update the theme schema and apply CSS variables.',
                    },
                    {
                        propName: 'setMode',
                        type: `<code>(mode: Mode) =&gt; void</code>`,
                        default: `-`,
                        desc: 'Toggle between light and dark mode.',
                    },
                    {
                        propName: 'setDirection',
                        type: `<code>(direction: Direction) =&gt; void</code>`,
                        default: `-`,
                        desc: 'Update layout direction.',
                    },
                    {
                        propName: 'setSideNavCollapse',
                        type: `<code>(collapse: boolean) =&gt; void</code>`,
                        default: `-`,
                        desc: 'Collapse or expand the side navigation.',
                    },
                ],
            },
        ]}
    />
)

const UseThemeDoc = () => (
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

export default UseThemeDoc
