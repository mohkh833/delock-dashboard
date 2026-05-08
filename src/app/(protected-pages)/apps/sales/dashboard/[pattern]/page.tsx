import { notFound } from 'next/navigation'
import movementMockData from '../_utils/movementMockData'
import PatternDetailView from './_components/PatternDetailView'

export default async function MovementPatternDetailPage({
    params,
}: {
    params: Promise<{ pattern: string }>
}) {
    const { pattern } = await params
    const data = movementMockData[pattern]

    if (!data) notFound()

    return <PatternDetailView pattern={pattern} data={data} />
}
