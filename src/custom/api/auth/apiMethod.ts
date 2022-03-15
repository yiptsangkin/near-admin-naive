import utils from '@csts/utils'
import { ReqType } from '@cots/type'
import apiUrl from './apiUrl'

const sendMessage = (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.sendMessage
    const result = utils.sendReq(reqType)
    return result
}

const getUserMenu = (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getUserMenu
    const result = utils.sendReq(reqType)
    return result
}

const getUserInfo = (reqType: ReqType) => {
    reqType.method = 'POST'
    reqType.url = apiUrl.getUserInfo
    const result = utils.sendReq(reqType)
    return result
}

export default {
    sendMessage,
    getUserMenu,
    getUserInfo
}
