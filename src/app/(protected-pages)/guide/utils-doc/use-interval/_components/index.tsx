'use client'

import DemoComponentApi from '@/components/docs/DemoComponentApi'
import DemoLayout from '@/components/docs/DemoLayout'
import Example from './Example'

const mdPath = 'UseIntervalDoc'

const demoHeader = {
    title: 'useInterval',
    desc: 'This hook provides an easy way to debounce any function, ensuring that it only executes after a specified delay.',
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
                propName: 'callback',
                type: `<code>() => void</code>`,
                default: `-`,
                desc: 'The function to be executed at each interval.',
            },
            {
                propName: 'delay',
                type: `<code>number | null</code>`,
                default: `-`,
                desc: 'The delay between each execution of the callback in milliseconds. If null, the interval is paused.',
            },
        ],
    },
]

const extra = (
    <DemoComponentApi
        keyText="return"
        api={[
            {
                api: [
                    {
                        propName: 'intervalRef',
                        type: `<code>React.MutableRefObject<number | null></code>`,
                        default: `-`,
                        desc: 'A ref object that holds the interval ID, which can be used for manual management of the interval.',
                    },
                ],
            },
        ]}
    />
)

const UseIntervalDoc = () => (
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

export default UseIntervalDoc
