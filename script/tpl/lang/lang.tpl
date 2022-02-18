import { createI18n } from 'vue-i18n'
<% importTpl %>

const i18n = createI18n({
    locale: 'zh-cn',
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
    uiI18nMap
}
