import { GUIDE_PREFIX_PATH } from '@/constants/route.constant'
import type { Routes } from '@/@types/routes'

const guideRoute: Routes = {
    [`${GUIDE_PREFIX_PATH}/documentation`]: {
        key: 'guide.documentation',
        authority: [],
        meta: { pageContainerType: 'contained' },
    },
    [`${GUIDE_PREFIX_PATH}/shared-component-doc/[slug]`]: {
        key: 'guide.sharedComponentDoc',
        authority: [],
        meta: { pageContainerType: 'contained' },
        dynamicRoute: true,
    },
    [`${GUIDE_PREFIX_PATH}/utils-doc/[slug]`]: {
        key: 'guide.utilsDoc',
        authority: [],
        meta: { pageContainerType: 'contained' },
        dynamicRoute: true,
    },
    [`${GUIDE_PREFIX_PATH}/changelog`]: {
        key: 'guide.changelog',
        authority: [],
        meta: { pageContainerType: 'contained' },
    },
}

export default guideRoute
