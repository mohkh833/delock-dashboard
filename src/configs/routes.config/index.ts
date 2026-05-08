import authRoute from './authRoute'
import appsRoute from './appsRoute'
import uiComponentsRoute from './uiComponentsRoute'
import authDemoRoute from './authDemoRoute'
import guideRoute from './guideRoute'
import othersRoute from './othersRoute'

import type { Routes } from '@/@types/routes'

export const protectedRoutes: Routes = {
    ...appsRoute,
    ...authDemoRoute,
    ...guideRoute,
    ...othersRoute,
}

export const publicRoutes: Routes = {
    ...uiComponentsRoute,
}

export const authRoutes = authRoute
