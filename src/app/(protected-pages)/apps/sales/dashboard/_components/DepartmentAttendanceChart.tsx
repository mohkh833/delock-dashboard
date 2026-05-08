'use client'
import Card from '@/components/ui/Card'
import { PieChart } from '@/components/shared/Chart'
import Table from '@/components/ui/Table'
import { colors } from '@/constants/colors.constant'
import useTranslation from '@/utils/hooks/useTranslation'

const { Tr, Th, Td, THead, TBody } = Table

const mockDepartments = [
    { nameKey: 'dept_production', present: 87, total: 95 },
    { nameKey: 'dept_sales', present: 42, total: 50 },
    { nameKey: 'dept_hr', present: 18, total: 20 },
    { nameKey: 'dept_operations', present: 63, total: 70 },
    { nameKey: 'dept_maintenance', present: 29, total: 35 },
]

const chartColors = [
    colors.blue.chart,
    colors.cyan.chart,
    colors.emerald.chart,
    colors.purple.chart,
    colors.red.chart,
]

const DepartmentAttendanceChart = () => {
    const t = useTranslation('nav.appsAiDashboard.departmentAttendance')

    const dataWithColors = mockDepartments.map((d, i) => ({
        ...d,
        percentage: Math.round((d.present / d.total) * 100),
        color: chartColors[i % chartColors.length],
    }))

    return (
        <Card bodyClass="flex flex-col h-full">
            <div className="mb-4">
                <h5>{t('title')}</h5>
            </div>

            <div className="flex justify-center mb-4">
                <PieChart
                    data={dataWithColors.map((d) => ({
                        name: t(d.nameKey),
                        value: d.present,
                    }))}
                    height={200}
                    pieConfig={{
                        dataKey: 'value',
                        nameKey: 'name',
                        cx: '50%',
                        cy: '50%',
                        innerRadius: 65,
                        outerRadius: 85,
                        paddingAngle: 2,
                        cornerRadius: 4,
                    }}
                    cellConfig={dataWithColors.map((d) => ({ fill: d.color }))}
                />
            </div>

            <div className="flex-1">
                <Table compact overflow={false} hoverable={false}>
                    <THead>
                        <Tr className="bg-transparent">
                            <Th>{t('department')}</Th>
                            <Th className="text-center">{t('present')}</Th>
                            <Th className="text-center">{t('percentage')}</Th>
                        </Tr>
                    </THead>
                    <TBody>
                        {dataWithColors.map((d, i) => (
                            <Tr key={i}>
                                <Td>
                                    <div className="flex items-center gap-2">
                                        <div
                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: d.color }}
                                        />
                                        <span className="font-medium">{t(d.nameKey)}</span>
                                    </div>
                                </Td>
                                <Td className="text-center">
                                    <span className="font-medium heading-text">
                                        {d.present}/{d.total}
                                    </span>
                                </Td>
                                <Td className="text-center">
                                    <span className="font-medium heading-text">
                                        {d.percentage}%
                                    </span>
                                </Td>
                            </Tr>
                        ))}
                    </TBody>
                </Table>
            </div>
        </Card>
    )
}

export default DepartmentAttendanceChart
