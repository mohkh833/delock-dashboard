import { APPS_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const appsRoute: Routes = {
    [`${APPS_PREFIX_PATH}/ai/chat`]: {
        key: 'apps.ai.chat',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/ai/image`]: {
        key: 'apps.ai.image',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/ai/writer`]: {
        key: 'apps.ai.writer',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/customers/dashboard`]: {
        key: 'apps.customers.dashboard',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/customers/list`]: {
        key: 'apps.customers.customerList',
        authority: [ADMIN, USER],
    },
    [`${APPS_PREFIX_PATH}/customers/[slug]/[subpath]`]: {
        key: 'apps.customers.customerDetails',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/customers/leads`]: {
        key: 'apps.customers.leads',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/customers/leads/[slug]/[subpath]`]: {
        key: 'apps.customers.leadDetails',
        authority: [ADMIN, USER],
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/customers/helpdesk`]: {
        key: 'apps.customers.helpdesk',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/customers/helpdesk/[ticketId]`]: {
        key: 'apps.customers.helpdesk',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/projects/dashboard`]: {
        key: 'apps.projects.dashboard',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/projects/list`]: {
        key: 'apps.projects.projectList',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/projects/[projectId]`]: {
        key: 'apps.projects.projectDetails',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/projects/scrumboard`]: {
        key: 'apps.projects.scrumboard',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/projects/timeline`]: {
        key: 'apps.projects.timeline',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/projects/tasks`]: {
        key: 'apps.projects.tasks',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/projects/settings/[slug]`]: {
        key: 'apps.projects.settings',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/sales/dashboard`]: {
        key: 'apps.sales.dashboard',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/sales/products`]: {
        key: 'apps.sales.productList',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/sales/products/[productId]`]: {
        key: 'apps.sales.editProduct',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/sales/product`]: {
        key: 'apps.sales.newProduct',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/sales/orders`]: {
        key: 'apps.sales.orderList',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/sales/order`]: {
        key: 'apps.sales.newOrder',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/sales/orders/[orderId]`]: {
        key: 'apps.sales.editOrder',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/analytics/dashboard`]: {
        key: 'apps.analytics.dashboard',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/analytics/forecast`]: {
        key: 'apps.analytics.forecast',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/analytics/revenue`]: {
        key: 'apps.analytics.revenue',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/analytics/subscriptions`]: {
        key: 'apps.analytics.subscriptions',
        authority: [ADMIN, USER],
    },
    [`${APPS_PREFIX_PATH}/analytics/reports`]: {
        key: 'apps.analytics.reports',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/crypto/dashboard`]: {
        key: 'apps.crypto.dashboard',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/crypto/market`]: {
        key: 'apps.crypto.market',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/crypto/coin/[coinId]`]: {
        key: 'apps.crypto.coin',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/crypto/spot`]: {
        key: 'apps.crypto.spot',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/crypto/assets`]: {
        key: 'apps.crypto.assets',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/crypto/kyc`]: {
        key: 'apps.crypto.kyc',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/hrm/employees`]: {
        key: 'apps.hrm.employees',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/hrm/attendance`]: {
        key: 'apps.hrm.attendance',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/hrm/payroll`]: {
        key: 'apps.hrm.payroll',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/hrm/dashboard`]: {
        key: 'apps.hrm.dashboard',
        authority: [ADMIN, USER],
        meta: {
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/hrm/leaves`]: {
        key: 'apps.hrm.leaves',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/hrm/announcements`]: {
        key: 'apps.hrm.announcements',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/accounts/settings`]: {
        key: 'apps.accounts.settings',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/accounts/settings/[tab]`]: {
        key: 'apps.accounts.settings',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
        dynamicRoute: true,
    },
    [`${APPS_PREFIX_PATH}/accounts/activity`]: {
        key: 'apps.accounts.activity',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/accounts/refferals`]: {
        key: 'apps.accounts.refferals',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
        },
    },
    [`${APPS_PREFIX_PATH}/accounts/pricing`]: {
        key: 'apps.accounts.pricing',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'contained',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/accounts/users`]: {
        key: 'apps.accounts.users',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${APPS_PREFIX_PATH}/accounts/invoice`]: {
        key: 'apps.accounts.invoice',
        authority: [ADMIN, USER],
        meta: {
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
}

export default appsRoute
