export type MovementCardData = {
    key: string
    metric: string
    metricLabelKey: string
    titleKey: string
    tableColumnKeys: string[]
    tableRows: string[][]
}

const movementMockData: Record<string, MovementCardData> = {
    'employee-transfers': {
        key: 'employee-transfers',
        metric: '35',
        metricLabelKey: 'transfersThisQuarter',
        titleKey: 'employeeTransfers',
        tableColumnKeys: ['colName', 'colType', 'colFrom', 'colTo', 'colDate'],
        tableRows: [
            ['أحمد محمد', 'موظف', 'المبيعات', 'العمليات', '2025-01-05'],
            ['سارة علي', 'عامل يومي', 'المستودع', 'الإنتاج', '2025-01-12'],
            ['خالد يوسف', 'موظف', 'الموارد البشرية', 'التدريب', '2025-01-18'],
            ['منى حسن', 'عامل يومي', 'الصيانة', 'المستودع', '2025-02-03'],
            ['عمر فاروق', 'موظف', 'الإنتاج', 'الجودة', '2025-02-10'],
            ['ليلى سامي', 'عامل يومي', 'التعبئة', 'الشحن', '2025-02-17'],
            ['يوسف كمال', 'موظف', 'المشتريات', 'اللوجستيات', '2025-03-02'],
            ['دينا وليد', 'موظف', 'خدمة العملاء', 'المبيعات', '2025-03-14'],
        ],
    },
    'entry-exit-rate': {
        key: 'entry-exit-rate',
        metric: '87%',
        metricLabelKey: 'punctualityRate',
        titleKey: 'entryExitRate',
        tableColumnKeys: ['colName', 'colType', 'colEntryTime', 'colExitTime', 'colStatus'],
        tableRows: [
            ['أحمد محمد', 'موظف', '07:58', '16:05', 'ملتزم'],
            ['سارة علي', 'عامل يومي', '08:20', '15:45', 'متأخر'],
            ['خالد يوسف', 'موظف', '07:45', '16:00', 'ملتزم'],
            ['منى حسن', 'عامل يومي', '08:00', '14:30', 'انصراف مبكر'],
            ['عمر فاروق', 'موظف', '08:35', '16:10', 'متأخر'],
            ['ليلى سامي', 'عامل يومي', '07:55', '16:00', 'ملتزم'],
            ['يوسف كمال', 'موظف', '08:02', '17:30', 'إضافي'],
            ['دينا وليد', 'موظف', '07:50', '16:00', 'ملتزم'],
        ],
    },
    'presence-outside-hours': {
        key: 'presence-outside-hours',
        metric: '24',
        metricLabelKey: 'employeesOutsideHours',
        titleKey: 'presenceOutsideHours',
        tableColumnKeys: ['colName', 'colType', 'colDepartment', 'colDate', 'colOvertimeHours'],
        tableRows: [
            ['أحمد محمد', 'موظف', 'العمليات', '2025-03-10', '3.5 ساعة'],
            ['خالد يوسف', 'موظف', 'الإنتاج', '2025-03-10', '2 ساعة'],
            ['سارة علي', 'عامل يومي', 'المستودع', '2025-03-11', '1.5 ساعة'],
            ['عمر فاروق', 'موظف', 'الجودة', '2025-03-11', '4 ساعات'],
            ['يوسف كمال', 'موظف', 'اللوجستيات', '2025-03-12', '2.5 ساعة'],
            ['منى حسن', 'عامل يومي', 'الصيانة', '2025-03-12', '1 ساعة'],
            ['دينا وليد', 'موظف', 'المبيعات', '2025-03-13', '3 ساعات'],
            ['ليلى سامي', 'عامل يومي', 'التعبئة', '2025-03-13', '2 ساعة'],
        ],
    },
    'staffing-forecast': {
        key: 'staffing-forecast',
        metric: '190',
        metricLabelKey: 'totalForecastNextWeek',
        titleKey: 'staffingForecast',
        tableColumnKeys: ['colPeriod', 'colEmployees', 'colDailyWorkers', 'colTotal', 'colConfidence'],
        tableRows: [
            ['الأسبوع القادم', '142', '38', '180', '91%'],
            ['أسبوعان', '145', '40', '185', '88%'],
            ['ثلاثة أسابيع', '147', '42', '189', '84%'],
            ['الشهر القادم', '148', '45', '193', '79%'],
            ['شهران', '150', '48', '198', '72%'],
            ['ثلاثة أشهر', '155', '52', '207', '65%'],
        ],
    },
}

export default movementMockData
