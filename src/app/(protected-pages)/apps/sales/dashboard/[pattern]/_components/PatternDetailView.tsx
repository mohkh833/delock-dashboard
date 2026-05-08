'use client'
import Table from '@/components/ui/Table'
import Button from '@/components/ui/Button'
import Container from '@/components/shared/Container'
import { LiArrowLeft } from '@/icons'
import Link from 'next/link'
import useTranslation from '@/utils/hooks/useTranslation'
import type { MovementCardData } from '../../_utils/movementMockData'

const { Tr, Th, Td, THead, TBody } = Table

type PatternDetailViewProps = {
    pattern: string
    data: MovementCardData
}

const PatternDetailView = ({ data }: PatternDetailViewProps) => {
    const t = useTranslation('nav.appsAiDashboard.movementPatterns')

    return (
        <Container>
            <div className="mb-6 flex items-center gap-4">
                <Link href="/apps/sales/dashboard">
                    <Button size="sm" variant="ghost" icon={<LiArrowLeft />}>
                        {t('back')}
                    </Button>
                </Link>
                <div>
                    <h4 className="font-bold">{t(data.titleKey)}</h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">
                        {t(data.metricLabelKey)}:{' '}
                        <span className="font-semibold heading-text">
                            {data.metric}
                        </span>
                    </p>
                </div>
            </div>

            <Table hoverable bordered>
                <THead>
                    <Tr>
                        {data.tableColumnKeys.map((colKey) => (
                            <Th key={colKey} className="text-center">{t(colKey)}</Th>
                        ))}
                    </Tr>
                </THead>
                <TBody>
                    {data.tableRows.map((row, i) => (
                        <Tr key={i}>
                            {row.map((cell, j) => (
                                <Td key={j} className="text-center">{cell}</Td>
                            ))}
                        </Tr>
                    ))}
                </TBody>
            </Table>
        </Container>
    )
}

export default PatternDetailView
