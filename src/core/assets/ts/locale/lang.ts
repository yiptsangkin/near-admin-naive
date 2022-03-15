import { createI18n } from 'vue-i18n'
import { deDE, dateDeDE, enUS, dateEnUS, idID, dateIdID, itIT, dateItIT, jaJP, dateJaJP, ruRU, dateRuRU, ukUA, dateUkUA, zhCN, dateZhCN, zhTW, dateZhTW } from 'naive-ui'
import customDeDE from '@locale/de_DE.ts'
import customEnUS from '@locale/en_US.ts'
import customIdID from '@locale/id_ID.ts'
import customItIT from '@locale/it_IT.ts'
import customJaJP from '@locale/ja_JP.ts'
import customRuRU from '@locale/ru_RU.ts'
import customUkUA from '@locale/uk_UA.ts'
import customZhCN from '@locale/zh_CN.ts'
import customZhTW from '@locale/zh_TW.ts'

const globalLocale = window.localStorage.getItem('nearCacheLang') || 'zh-cn'

const i18n = createI18n({
    locale: globalLocale,
    fallbackLocale: 'zh-cn',
    messages: {
        [customDeDE.locale]: customDeDE,
        [customEnUS.locale]: customEnUS,
        [customIdID.locale]: customIdID,
        [customItIT.locale]: customItIT,
        [customJaJP.locale]: customJaJP,
        [customRuRU.locale]: customRuRU,
        [customUkUA.locale]: customUkUA,
        [customZhCN.locale]: customZhCN,
        [customZhTW.locale]: customZhTW
    },
})

const uiI18nMap = {
    [customDeDE.locale]: { locale: deDE, dateLocale: dateDeDE },
    [customEnUS.locale]: { locale: enUS, dateLocale: dateEnUS },
    [customIdID.locale]: { locale: idID, dateLocale: dateIdID },
    [customItIT.locale]: { locale: itIT, dateLocale: dateItIT },
    [customJaJP.locale]: { locale: jaJP, dateLocale: dateJaJP },
    [customRuRU.locale]: { locale: ruRU, dateLocale: dateRuRU },
    [customUkUA.locale]: { locale: ukUA, dateLocale: dateUkUA },
    [customZhCN.locale]: { locale: zhCN, dateLocale: dateZhCN },
    [customZhTW.locale]: { locale: zhTW, dateLocale: dateZhTW }
}

export default {
    i18n,
    uiI18nMap,
    t: i18n.global.t
}
