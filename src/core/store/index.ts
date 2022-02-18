import { defineStore } from 'pinia'

export default defineStore('coreStore', {
    state () {
        return {
            globalTheme: null,
            globalLocale: 'zh-cn',
            defaultTheme: {
                common: {
                    primaryColor: '#41B783'
                }
            },
            langList: [
                {
                    label: '简体中文',
                    value: 'zh-cn',
                }
            ]
        }
    },
    actions: {
        setGlobalLangList (langList: {label: string, value: string}[]) {
            this.langList = langList
        },
    },
})
