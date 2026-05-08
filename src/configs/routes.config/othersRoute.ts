import type { Routes } from '@/@types/routes'

const othersRoute: Routes = {
    '/landing': {
        key: 'landing',
        authority: [],
    },
    '/access-denied': {
        key: 'accessDenied',
        authority: [],
    },
    '/404': {
        key: 'notFound',
        authority: [],
    },
}

export default othersRoute
