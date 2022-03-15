import { createRouter, createWebHistory } from 'vue-router'
import config from '@csts/config'

const NManage = () => import('@cocp/NManage.vue')

let basePath: string
if (config.publicPath) {
    basePath = window.location.pathname.split('/').slice(1, 3).join('/')
} else {
    basePath = window.location.pathname.split('/').slice(1, 2).join('/')
}

const VueRouter = createRouter({
    history: createWebHistory(basePath),
    routes: [
        {
            path: '/',
            component: NManage,
        },
    ],
})

export default VueRouter
