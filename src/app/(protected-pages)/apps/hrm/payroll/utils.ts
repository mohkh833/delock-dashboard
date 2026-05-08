import dayjs from 'dayjs'

export const getCurrentMonth = () => {
    return dayjs().format('YYYY-MM')
}

export const formatMonthLabel = (monthStr: string) => {
    return dayjs(monthStr + '-01').format('MMM YYYY')
}

export const generateMonthOptions = () => {
    const options = []
    for (let i = 0; i < 12; i++) {
        const date = dayjs().subtract(i, 'month')
        options.push({
            value: date.format('YYYY-MM'),
            label: date.format('MMM YYYY'),
        })
    }
    return options
}
