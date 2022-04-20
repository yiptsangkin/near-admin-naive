import { ComRespone } from '@cots/type'
import utils from '@csts/utils'
import config from '@csts/config'

const getSendMsg = (): ComRespone => {
    const result = {
        code: 0,
        message: '获取成功',
        data: {
            msgCode: (1000 + parseInt((Math.random() * 8999).toString(), 10)).toString()
        },
        timestamp: new Date().getTime()
    }
    return result
}

const getUserMenu = (): ComRespone => {
    const result = {
        code: 0,
        message: '获取成功',
        data: [
            {
                label: 'menuObj.menu-0',
                key: 'menu-0',
                children: [
                    {
                        label: 'menuObj.menu-0-0',
                        key: 'menu-0-0',
                        children: [
                            {
                                label: 'menuObj.menu-0-0-0',
                                key: 'menu-0-0-0',
                                component: 'https://v3.cn.vuejs.org',
                                params: {
                                    checkSave: true
                                }
                            },
                            {
                                label: 'menuObj.menu-0-0-1',
                                key: 'menu-0-0-1',
                                component: 'https://www.naiveui.com'
                            },
                            {
                                label: 'menuObj.menu-0-0-2',
                                key: 'menu-0-0-2',
                                component: 'https://pinia.vuejs.org',
                                params: {
                                    checkSave: true
                                }
                            },
                            {
                                label: 'menuObj.menu-0-0-3',
                                key: 'menu-0-0-3',
                                component: 'https://yiptsangkin.github.io/auth'
                            }
                        ]
                    },
                    {
                        label: 'menuObj.menu-0-1',
                        key: 'menu-0-1',
                        children: [
                            {
                                label: 'menuObj.menu-0-1-0',
                                key: 'menu-0-1-0',
                                children: [
                                    {
                                        label: 'menuObj.menu-0-1-0-0',
                                        key: 'menu-0-1-0-0',
                                        component: 'guide/PageComponent',
                                        params: {
                                            tip: 'guide.pageComponent.tip',
                                            checkSave: 'guide.pageComponent.checkSave',
                                            apiNew: 'guide.pageComponent.apiNew',
                                            isAffix: 'guide.pageComponent.isAffix',
                                            pageUrl: 'guide.pageComponent.pageUrl',
                                        }
                                    },
                                    {
                                        label: 'menuObj.menu-0-1-0-1',
                                        key: 'menu-0-1-0-1',
                                        component: 'https://www.tusimple.com/'
                                    }
                                ]
                            },
                            {
                                label: 'menuObj.menu-0-1-1',
                                key: 'menu-0-1-1',
                                children: [
                                    {
                                        label: 'menuObj.menu-0-1-1-0',
                                        key: 'menu-0-1-1-0',
                                        component: 'guide/ApplicationConfig',
                                    },
                                    {
                                        label: 'menuObj.menu-0-1-1-1',
                                        key: 'menu-0-1-1-1',
                                        component: 'guide/I18nInternational',
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                label: 'menuObj.menu-1',
                key: 'menu-1',
                children: [
                    {
                        label: 'menuObj.menu-1-0',
                        key: 'menu-1-0',
                        children: [
                            {
                                label: 'menuObj.menu-1-0-0',
                                key: 'menu-1-0-0',
                                component: 'https://yiptsangkin.github.io/auth'
                            },
                            {
                                label: 'menuObj.menu-1-0-1',
                                key: 'menu-1-0-1',
                                component: 'https://yiptsangkin.github.io/auth'
                            }
                        ]
                    }
                ]
            }
        ],
        timestamp: new Date().getTime()
    }
    return result
}

const getUserInfo = (): ComRespone => {
    const result = {
        code: 0,
        message: '获取成功',
        data: {
            userName: 'nearyip',
            userId: utils.randomCharacter(32),
            userAvatar: config.publicPath ? `/${config.publicPath}/static/images/common/default_beauty.jpg` : '/static/images/common/default_beauty.jpg',
            userEmail: 'yiptsangkin@gmail.com',
            userRole: ['admin'],
        },
        timestamp: new Date().getTime()
    }
    return result
}

export default {
    getSendMsg,
    getUserMenu,
    getUserInfo
}
