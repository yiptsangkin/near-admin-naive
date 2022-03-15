import { defineStore } from 'pinia'
import { darkTheme, MenuGroupOption, MenuOption } from 'naive-ui'
import utils from '@cots/utils'
import { VNode, VNodeChild } from 'vue'
import { CpInfo } from '@cots/type'

const globalLocale = window.localStorage.getItem('nearCacheLang') || 'zh-cn'
const RDN_KEY = utils.randomCharacter(6)
const cacheCurrentMenu = utils.getCacheLocalStorage('nearCacheCurrentMenu')
let cacheCurTabIdx = 0
let cacheCurTabList = [
    {
        component: 'home/HomePage',
        label: 'menuObj.homePage',
        pk: RDN_KEY,
        breadList: [],
        asyncComponent: undefined,
        params: {
            isAffix: true,
            pageUrl: undefined,
            checkSave: false
        }
    }
]

const cacheTheme = utils.getCacheLocalStorage('nearCacheTheme') || 'normal'

const themeMap = {
    dark: darkTheme,
    normal: null
}

try {
    cacheCurTabIdx = parseInt(utils.getCacheLocalStorage('nearCacheTabIdx'), 10) || 0
    cacheCurTabList = JSON.parse(utils.getCacheLocalStorage('nearCacheTabList')) || cacheCurTabList
    cacheCurTabList.forEach((item) => {
        item.asyncComponent = undefined
    })
} catch (error) {
    console.error(error)
}

const coreStore = defineStore('coreStore', {
    state () {
        return {
            globalTheme: cacheTheme,
            globalThemeMap: themeMap,
            globalLocale,
            defaultTheme: {
                common: {
                    primaryColor: '#41B783',
                    primaryColorHover: '#33ad77',
                    primaryColorActive: '#23a46b',
                    heightSmall: '26px'
                },
                DataTable: {
                    lineHeight: 1
                },
                Dialog: {
                    contentMargin: '28px 0'
                }
            },
            langList: [
                {
                    label: '简体中文',
                    value: 'zh-cn',
                }
            ],
            curTabList: cacheCurTabList,
            curTabIdx: cacheCurTabIdx,
            currentMenuGroup: 0,
            currentMenu: cacheCurrentMenu,
            currentHeaderMenuKey: undefined,
            headerMenuList: [],
            asideMenuList: [],
            fullScreen: false,
        }
    },
    actions: {
        setGlobalLangList (langList: {label: string, value: string}[]) {
            this.langList = langList
        },
        setGlobalLang (lang: string) {
            this.globalLocale = lang
        },
        setCurTabIdx (curTabIdx: number) {
            this.curTabIdx = curTabIdx
            this.currentMenu = this.curTabList[curTabIdx].key
            utils.setCacheLocalStorage('nearCacheTabIdx', curTabIdx)
        },
        addCurTab (curTab: CpInfo) {
            if (!curTab.params) {
                curTab.params = {}
            }
            this.curTabList.push(curTab)
            utils.setCacheLocalStorage('nearCacheTabList', JSON.stringify(this.curTabList))
        },
        setMenuList (menuList: {
            label: string,
            key: string,
            disabled?: boolean,
            backChildren?: MenuOption[] | MenuGroupOption[],
            children?: MenuOption[] | MenuGroupOption[],
            idx?: number,
            icon?: () => VNode,
            extra?: string | (() => VNodeChild),
        }[]) {
            const newMenuList = menuList.map((menu, idx) => {
                if (menu.children) {
                    menu.backChildren = menu.children
                }
                delete menu.children
                menu.idx = idx
                return menu
            })
            this.headerMenuList = utils.setMenuBreadcrumb(newMenuList)
            this.currentHeaderMenuKey = this.headerMenuList[0].key
            this.asideMenuList = this.headerMenuList[0].backChildren || []
        },
        setAsideMenuList (idx: number) {
            this.currentMenuGroup = idx
            this.asideMenuList = this.headerMenuList[idx].backChildren || []
            this.currentHeaderMenuKey = this.headerMenuList[idx].key
        },
        setCurrentMenu (key: string) {
            this.currentMenu = key
            utils.setCacheLocalStorage('nearCacheCurrentMenu', key)
        },
        setGlobalTheme (theme: string) {
            this.globalTheme = theme
            utils.setCacheLocalStorage('nearCacheTheme', theme)
        },
        closeTab (idx: number) {
            this.curTabList.splice(idx, 1)
            utils.setCacheLocalStorage('nearCacheTabList', JSON.stringify(this.curTabList))
            if (this.curTabIdx >= idx) {
                this.setCurTabIdx(this.curTabIdx - 1)
            }
        },
        affixTab (idx: number, isAffix: boolean) {
            this.curTabList[idx].params.isAffix = isAffix
            utils.setCacheLocalStorage('nearCacheTabList', JSON.stringify(this.curTabList))
        },
        closeAll () {
            this.curTabList = this.curTabList.filter((item) => item.params && item.params.isAffix)
            utils.setCacheLocalStorage('nearCacheTabList', JSON.stringify(this.curTabList))
            this.setCurTabIdx(0)
        },
        closeRight (idx: number) {
            this.curTabList.splice(idx + 1)
            utils.setCacheLocalStorage('nearCacheTabList', JSON.stringify(this.curTabList))
            if (idx < this.curTabIdx) {
                this.setCurTabIdx(idx)
            }
        },
        closeOther (idx: number) {
            this.curTabList = this.curTabList.filter((item, i) => (i === idx || i === 0))
            utils.setCacheLocalStorage('nearCacheTabList', JSON.stringify(this.curTabList))
            this.setCurTabIdx(1)
        },
        setFullScreen (fullScreen: boolean) {
            this.fullScreen = fullScreen
        }
    },
})

export default coreStore
