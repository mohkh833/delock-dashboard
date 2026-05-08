import dayjs from 'dayjs'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'
import type { TimeRange, ComparisonPeriod } from '../types'

dayjs.extend(quarterOfYear)

export const getDateRanges = async (
    timeRange: TimeRange,
    comparisonPeriod: ComparisonPeriod,
) => {
    const now = dayjs()
    let current: { start: Date; end: Date }
    let comparison: { start: Date; end: Date }

    switch (timeRange) {
        case 'thisWeek':
            current = {
                start: now.startOf('week').toDate(),
                end: now.endOf('week').toDate(),
            }
            break
        case 'thisMonth':
            current = {
                start: now.startOf('month').toDate(),
                end: now.endOf('month').toDate(),
            }
            break
        case 'thisQuarter':
            current = {
                start: now.startOf('quarter').toDate(),
                end: now.endOf('quarter').toDate(),
            }
            break
        case 'thisYear':
            current = {
                start: now.startOf('year').toDate(),
                end: now.endOf('year').toDate(),
            }
            break
        default:
            current = {
                start: now.startOf('month').toDate(),
                end: now.endOf('month').toDate(),
            }
    }

    switch (comparisonPeriod) {
        case 'lastWeek':
            comparison = {
                start: now.subtract(1, 'week').startOf('week').toDate(),
                end: now.subtract(1, 'week').endOf('week').toDate(),
            }
            break
        case 'lastMonth':
            comparison = {
                start: now.subtract(1, 'month').startOf('month').toDate(),
                end: now.subtract(1, 'month').endOf('month').toDate(),
            }
            break
        case 'lastQuarter':
            comparison = {
                start: now.subtract(1, 'quarter').startOf('quarter').toDate(),
                end: now.subtract(1, 'quarter').endOf('quarter').toDate(),
            }
            break
        case 'lastYear':
            comparison = {
                start: now.subtract(1, 'year').startOf('year').toDate(),
                end: now.subtract(1, 'year').endOf('year').toDate(),
            }
            break
        default:
            comparison = {
                start: now.subtract(1, 'month').startOf('month').toDate(),
                end: now.subtract(1, 'month').endOf('month').toDate(),
            }
    }

    return { current, comparison }
}
