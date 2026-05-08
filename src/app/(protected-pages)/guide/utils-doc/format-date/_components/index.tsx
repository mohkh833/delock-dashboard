'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'FormatDateDoc'

const demoHeader = {
    title: 'formatDate',
    desc: 'Functions to format date values into human-readable strings using <code>dayjs</code>.',
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
                propName: 'date',
                type: `<code>Date | string | number</code>`,
                default: `-`,
                desc: 'The date value to format.',
            },
            {
                propName: 'format',
                type: `<code>string</code>`,
                default: `<code>'MMM DD, YYYY'</code>`,
                desc: 'A dayjs format string.',
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
                        propName: 'result',
                        type: `<code>string</code>`,
                        default: `-`,
                        desc: 'The formatted date string.',
                    },
                ],
            },
        ]}
    />
)

const FormatDateDoc = () => (
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

export default FormatDateDoc
