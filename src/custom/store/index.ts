import { defineStore } from 'pinia'
import config from '@csts/config'

export default defineStore('customStore', {
    state () {
        return {
            userInfo: {
                userName: undefined,
                userId: undefined,
                userAvatar: undefined,
                userEmail: undefined
            },
            sysInfo: {
                ...config.sysInfo
            }
        }
    },
    actions: {
        setUserInfo (userInfo: {
            userName?: string,
            userId?: string,
            userAvatar?: string
            userEmail?: string
        }) {
            this.userInfo = userInfo
        },
        setSysInfo (infoKey: string, value: any) {
            this.sysInfo[infoKey] = value
        }
    },
})
