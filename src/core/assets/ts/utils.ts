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

export default {
    randomCharacter,
    setCacheLocalStorage,
    getCacheLocalStorage,
    setMenuBreadcrumb,
    checkIfUrl,
    fullScreenCtl
}
