import { createRouter, createWebHistory } from 'vue-router'
import utils from '@cots/utils'

const NLoginPanel = () => import('../view/login/NLoginPanel.vue')

const basePath = utils.getBasePath()

const VueRouter = createRouter({
    history: createWebHistory(basePath),
    routes: [
        {
            path: '/',
            component: NLoginPanel,
        },
    ],
})

export default VueRouter
