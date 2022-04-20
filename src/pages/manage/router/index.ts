import { createRouter, createWebHistory } from 'vue-router'
import utils from '@cots/utils'

const NManage = () => import('@cocp/NManage.vue')

const basePath = utils.getBasePath()

const routesList: string = localStorage.getItem(`${basePath}AsyncRoute`) || ''
let newRoutesList
try {
    newRoutesList = JSON.parse(routesList)
    if (!Array.isArray(newRoutesList)) {
        newRoutesList = []
    }
} catch (e) {
    newRoutesList = []
}

newRoutesList.forEach((item) => {
    item.component = () => import(`../view/${item.componentPath}`)
})

const VueRouter = createRouter({
    history: createWebHistory(basePath),
    routes: [
        {
            path: '/',
            component: NManage
        },
    ].concat(newRoutesList),
})

VueRouter.beforeEach((to, from, next) => {
    if (to.matched.length > 0) {
        if (to.meta.title) {
            utils.setPageTitle(to.meta.title)
        } else {
            utils.setPageTitle('')
        }
        next()
    } else {
        if (/\/single\//.test(to.path)) {
            const cachePath = to.path.replace('/single/', '')
            const tempRouteList: any = localStorage.getItem(`${basePath}AsyncRoute`)
            let routesListObj
            try {
                routesListObj = JSON.parse(tempRouteList)
                if (!Array.isArray(routesListObj)) {
                    routesListObj = []
                }
            } catch (e) {
                routesListObj = []
            }
            let hadCp = false
            let cpIndex
            for (let i = 0; i < routesListObj.length; i += 1) {
                const item = routesListObj[i]
                if (item.component === cachePath) {
                    hadCp = true
                    cpIndex = i
                    break
                }
            }
            if (!hadCp) {
                routesListObj.push({
                    path: to.path,
                    componentPath: cachePath
                })
            }
            // persisted router
            localStorage.setItem(`${basePath}AsyncRoute`, JSON.stringify(routesListObj))
            window.location.reload()
        } else {
            next()
        }
    }
})

export default VueRouter
