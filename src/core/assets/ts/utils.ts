import { MenuGroupOption, MenuOption } from 'naive-ui'
import config from '@csts/config'

const randomCharacter = (rdn: number): string => {
    const newList = []
    const characterList = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P',
        'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
    for (let i = 0; i < rdn; i += 1) {
        const rdnChar = characterList[parseInt((Math.random() * characterList.length).toString(), 10)]
        newList.push(i === 0 ? rdnChar : rdnChar.toLowerCase())
    }
    return newList.join('')
}

const setCacheLocalStorage = (cacheKey: string, cacheValue: any) => {
    localStorage.setItem(cacheKey, cacheValue)
}

const getCacheLocalStorage = (cacheKey: string) => localStorage.getItem(cacheKey)

const removeCacheLocalStorage = (cacheKey: string) => localStorage.removeItem(cacheKey)

const setMenuBreadcrumb = (menuList: any[], breadList = []) => {
    menuList.forEach((menu: any) => {
        const temMenuList = menu.backChildren || menu.children
        const temBreadList = JSON.parse(JSON.stringify(breadList))
        const temMenu = JSON.parse(JSON.stringify(menu))
        if (temMenuList) {
            setMenuBreadcrumb(temMenuList, [...temBreadList, temMenu])
        } else {
            menu.breadList = breadList
        }
    })
    return menuList
}

const checkIfUrl = (component: string) => {
    const reg = /^(http|https):\/\/([\w.]+\/?)\S*/
    return reg.test(component)
}

const fullScreenCtl = (tp: boolean) => {
    const ele = document.documentElement
    if (tp) {
        if (ele.requestFullscreen) {
            ele.requestFullscreen()
        }
    } else {
        if (document.exitFullscreen && document.fullscreenElement) {
            document.exitFullscreen()
        }
    }
}

const checkObjArrayPropChange = (source, target, attr) => {
    if (source.length !== target.length) {
        return -1
    }
    for (let i = 0; i < source.length; i += 1) {
        const sourceItem = source[i]
        const targetItem = target[i]
        if (sourceItem[attr] !== targetItem[attr]) {
            return i
        }
    }
    return -1
}

const toBase64 = (str: string) => {
    return window.btoa(unescape(encodeURIComponent(str)))
}

const exportExcel = (columnList: string[], dataList: any[], fileName: string) => {
    let ctx = ''
    columnList.forEach((item: string) => {
        ctx += `<td>${item}</td>`
    })
    ctx = `<tr>${ctx}</tr>`

    dataList.forEach((item) => {
        ctx += '<tr>'
        for (const key of Object.keys(item)) {
            ctx += `<td>${item[key] + '\t'}</td>`
        }
        ctx += '</tr>'
    })

    const worksheet = fileName
    const uri = 'data:application/vnd.ms-excel;base64,'

    const tpl = `<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
                    <head>
                        <meta http-equiv="content-type" content="text/plain;charset=UTF-8"/></head>
                        <!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>${worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]-->
                    </head>
                    <body>
                        <table border="1px">${ctx}</table>
                    </body>
                </html>`
    const link = document.createElement('a')
    link.href = uri + toBase64(tpl)
    link.download = `${fileName}.xls`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}

const isEmpty = (val: any): boolean => {
    if (Array.isArray(val)) {
        if (val.length > 0) {
            return false
        }
        return true
    }
    return !(val !== undefined && val !== null && val !== '')
}

const getMenuRootCp = (menuList: MenuOption[] | MenuGroupOption[], isObj?: boolean, replaceField = { label: 'label' }) => {
    let rightPathList: any[] = []
    menuList.forEach((item: MenuOption) => {
        if (isEmpty(item.children) && !isEmpty(item.component)) {
            if (isObj) {
                rightPathList.push({
                    component: item.component,
                    key: item.key,
                    label: item[replaceField.label]
                })
            } else {
                rightPathList.push(item.key)
            }
        } else if (!isEmpty(item.children) && isEmpty(item.component)) {
            rightPathList = rightPathList.concat(getMenuRootCp(item.children, isObj, replaceField))
        }
    })
    return rightPathList
}

const getIfExistMenu = (menuKey: string | number | boolean, menuList: MenuOption[] | MenuGroupOption[]) => {
    const rootMenuList = getMenuRootCp(menuList)
    return rootMenuList.indexOf(menuKey)
}

const getBasePath = (withPublic = true) => {
    let basePath
    if (withPublic) {
        if (config.publicPath) {
            basePath = window.location.pathname.split('/').slice(1, 3).join('/')
        } else {
            basePath = window.location.pathname.split('/').slice(1, 2).join('/')
        }
    } else {
        if (config.publicPath) {
            basePath = window.location.pathname.split('/').slice(2, 3).join('/')
        } else {
            basePath = window.location.pathname.split('/').slice(1, 2).join('/')
        }
    }
    return basePath
}

const setPageTitle = (title): void => {
    if (title) {
        window.document.title = title
    }
}

export default {
    randomCharacter,
    setCacheLocalStorage,
    getCacheLocalStorage,
    setMenuBreadcrumb,
    checkIfUrl,
    fullScreenCtl,
    checkObjArrayPropChange,
    removeCacheLocalStorage,
    exportExcel,
    getIfExistMenu,
    getBasePath,
    setPageTitle
}
