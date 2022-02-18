import { createRouter, createWebHistory } from 'vue-router'
import config from '@csts/config'

let basePath: string
if (config.publicPath) {
    basePath = window.location.pathname.split('/').slice(1, 3).join('/')
} else {
    basePath = window.location.pathname.split('/').slice(2, 3).join('/')
}

console.log(basePath)

const VueRouter = createRouter({
    history: createWebHistory(basePath),
    routes: [],
})

export default VueRouter
