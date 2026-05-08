import SyntaxHighlighter from '@/components/shared/SyntaxHighlighter'

const Example = () => {
    return (
        <SyntaxHighlighter language="js">{`import useMenuActive from '@/utils/hooks/useMenuActive'
import useNavigation from '@/utils/hooks/useNavigation'

const Component = ({ routeKey }) => {

    const { navigationTree } = useNavigation()

	const { activedRoute, includedRouteTree } = useMenuActive(navigationTree, routeKey)

	return (...)
}
`}</SyntaxHighlighter>
    )
}

export default Example
