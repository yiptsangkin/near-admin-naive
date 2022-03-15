import { createI18n } from 'vue-i18n'
<% importTpl %>

const globalLocale = window.localStorage.getItem('nearCacheLang') || 'zh-cn'

const i18n = createI18n({
    locale: globalLocale,
    fallbackLocale: 'zh-cn',
    messages: {
        <% exportCustomerTpl %>
    },
})

const uiI18nMap = {
    <% exportUiTpl %>
}

export default {
    i18n,
    uiI18nMap,
    t: i18n.global.t
}
