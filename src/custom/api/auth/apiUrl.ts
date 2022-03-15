import config from '@csts/config'

const sendMessage = `${config.apiHost}/mock-data/getSendMsg`
const getUserMenu = `${config.apiHost}/mock-data/getUserMenu`
const getUserInfo = `${config.apiHost}/mock-data/getUserInfo`

export default {
    sendMessage,
    getUserMenu,
    getUserInfo
}
