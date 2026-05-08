import { AUTH_PREFIX_PATH } from '@/constants/route.constant'
import { ADMIN, USER } from '@/constants/roles.constant'
import type { Routes } from '@/@types/routes'

const authDemoRoute: Routes = {
    [`${AUTH_PREFIX_PATH}/sign-in-side`]: {
        key: 'authentication.signInSide',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/sign-in-simple`]: {
        key: 'authentication.signInSimple',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/sign-in-centred`]: {
        key: 'authentication.signInCentred',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/sign-up-simple`]: {
        key: 'authentication.signUpSimple',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/sign-up-side`]: {
        key: 'authentication.signUpSide',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/sign-up-centred`]: {
        key: 'authentication.signUpCentred',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/reset-password-simple`]: {
        key: 'authentication.resetPasswordSimple',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/reset-password-side`]: {
        key: 'authentication.resetPasswordSide',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/reset-password-centred`]: {
        key: 'authentication.resetPasswordCentred',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/forgot-password-simple`]: {
        key: 'authentication.forgotPasswordSimple',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/forgot-password-side`]: {
        key: 'authentication.forgotPasswordSide',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/forgot-password-centred`]: {
        key: 'authentication.forgotPasswordCentred',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/otp-verification-centred`]: {
        key: 'authentication.otpVerificationCentred',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/otp-verification-side`]: {
        key: 'authentication.otpVerificationSide',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
    [`${AUTH_PREFIX_PATH}/otp-verification-simple`]: {
        key: 'authentication.otpVerificationSimple',
        authority: [ADMIN, USER],
        meta: {
            layout: 'blank',
            pageContainerType: 'gutterless',
            footer: false,
        },
    },
}

export default authDemoRoute
