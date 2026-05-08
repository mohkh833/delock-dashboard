'use client'
import { useState, useMemo, useRef, useEffect } from 'react'
import Card from '@/components/ui/Card'
import { BarChart } from '@/components/shared/Chart'
import { colors } from '@/constants/colors.constant'
import useTranslation from '@/utils/hooks/useTranslation'
import useTheme from '@/utils/hooks/useTheme'
import { useLocale } from 'next-intl'

type TimeFilter = 'day' | 'week' | 'month' | 'year'

const deptColors = [
    colors.blue.chart,
    colors.cyan.chart,
    colors.emerald.chart,
    colors.purple.chart,
    colors.orange.chart,
]

const deptKeys = ['production', 'sales', 'hr', 'operations', 'maintenance'] as const
type DeptKey = (typeof deptKeys)[number]

const deptArNames = ['الإنتاج', 'المبيعات', 'الموارد البشرية', 'العمليات', 'الصيانة']
const deptEnNames = ['Production', 'Sales', 'HR', 'Operations', 'Maintenance']

const base: Record<DeptKey, number> = {
    production: 87,
    sales: 42,
    hr: 18,
    operations: 63,
    maintenance: 29,
}

const dayLabels = ['8:00', '9:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00']
const dayDeltas = [0, 3, 1, -2, -30, -15, -1, -3, -7, -45]

const weekDeltas = [5, 8, 3, 9, 6, 4, -20]

const monthDeltas = [3, 5, -2, 7, 1, -3, 8, 4, -5, 6, 2, -4, 9, 3, -1, 5, 7, -3, 4, 8, 2, -5, 6, 3, -2, 7, 4, -1, 5, 2]

const yearDeltas = [-2, -4, 1, 3, 0, 4, 2, -1, -3, -5, -7, -9]

const arWeekDays = ['السبت', 'الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة']
const enWeekDays = ['Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri']

const arMonths = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر']
const enMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function buildRow(label: string, delta: number) {
    return {
        label,
        ...Object.fromEntries(
            deptKeys.map((k) => [k, Math.max(0, base[k] + delta)])
        ),
    }
}

function getChartData(filter: TimeFilter, locale: string) {
    if (filter === 'day') {
        return dayLabels.map((label, i) => {
            const pct = dayDeltas[i]
            return {
                label,
                ...Object.fromEntries(
                    deptKeys.map((k) => [k, Math.max(0, Math.round(base[k] * (1 + pct / 100)))])
                ),
            }
        })
    }
    if (filter === 'week') {
        const labels = locale === 'ar' ? arWeekDays : enWeekDays
        return labels.map((label, i) => buildRow(label, weekDeltas[i]))
    }
    if (filter === 'month') {
        return Array.from({ length: 30 }, (_, i) => buildRow(String(i + 1), monthDeltas[i]))
    }
    // year
    const labels = locale === 'ar' ? arMonths : enMonths
    return labels.map((label, i) => buildRow(label, yearDeltas[i]))
}

const AttendanceBarChart = () => {
    const t = useTranslation('nav.appsAiDashboard.attendanceChart')
    const locale = useLocale()
    const direction = useTheme((state) => state.direction)
    const [filter, setFilter] = useState<TimeFilter>('week')
    const containerRef = useRef<HTMLDivElement>(null)
    const [chartHeight, setChartHeight] = useState(410)

    useEffect(() => {
        const el = containerRef.current
        if (!el) return
        const observer = new ResizeObserver(([entry]) => {
            const w = entry.contentRect.width
            setChartHeight(Math.min(520, Math.max(260, Math.round(w * 0.5))))
        })
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const data = useMemo(() => getChartData(filter, locale), [filter, locale])
    const deptNames = locale === 'ar' ? deptArNames : deptEnNames

    const filters: { key: TimeFilter; label: string }[] = [
        { key: 'day', label: t('day') },
        { key: 'week', label: t('week') },
        { key: 'month', label: t('month') },
        { key: 'year', label: t('year') },
    ]

    return (
        <Card ref={containerRef}>
            <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h5>{t('title')}</h5>
                <div className="flex gap-1">
                    {filters.map((f) => (
                        <button
                            key={f.key}
                            onClick={() => setFilter(f.key)}
                            className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                filter === f.key
                                    ? 'bg-primary text-white'
                                    : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700'
                            }`}
                        >
                            {f.label}
                        </button>
                    ))}
                </div>
            </div>
            <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4">
                {deptNames.map((name, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                        <div
                            className="w-3 h-3 rounded-full flex-shrink-0"
                            style={{ backgroundColor: deptColors[i] }}
                        />
                        <span className="text-xs text-gray-600 dark:text-gray-400">{name}</span>
                    </div>
                ))}
            </div>
            <BarChart
                data={data}
                height={chartHeight}
                barConfig={deptKeys.map((key, i) => ({
                    dataKey: key,
                    fill: deptColors[i],
                    stackId: 'stack',
                    radius: i === deptKeys.length - 1 ? [4, 4, 0, 0] : [0, 0, 0, 0],
                    maxBarSize: filter === 'month' ? 14 : 40,
                }))}
                xAxisConfig={{
                    dataKey: 'label',
                    axisLine: false,
                    tickLine: false,
                    interval: filter === 'month' ? 4 : 0,
                    tick: { fontSize: 11 },
                }}
                yAxisConfig={{
                    hide: false,
                    axisLine: false,
                    tickLine: false,
                    orientation: direction === 'rtl' ? 'right' : 'left',
                    width: 35,
                    tick: { fontSize: 11 },
                }}
                tooltipContentConfig={{
                    nameFormatter: (name: string) => {
                        const idx = deptKeys.indexOf(name as DeptKey)
                        return idx >= 0 ? deptNames[idx] : name
                    },
                }}
            />
        </Card>
    )
}

export default AttendanceBarChart
