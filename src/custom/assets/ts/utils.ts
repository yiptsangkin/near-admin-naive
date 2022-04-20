import { ReqType, GetLogLineParams, LogLineParams } from '@cots/type'
import qs from 'qs'
import axios, { AxiosRequestConfig } from 'axios'
import md5 from 'js-md5'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import LogLine from 'logline'

NProgress.configure({ showSpinner: false })

const logLineObj: any = {
    setLog ({ module, logType, desc, data }: LogLineParams): void {
        LogLine.using(LogLine.PROTOCOL.INDEXEDDB)
        if (!module) {
            // 默认是接口请求的错误
            module = 'api-request'
        }
        const logObj = new LogLine(module)
        switch (logType) {
        case 'info':
            logObj.info(desc)
            break
        case 'error':
            logObj.error(desc, data)
            break
        case 'warning':
            logObj.warning(desc)
            break
        default:
            logObj.error(desc, data)
        }
    },
    // get log
    getLog ({ start, end, callback }: GetLogLineParams) {
        // start, end的单位为d，例如：1天-1d，半天-.5d，
        if (start && end) {
            // 获取start-end范围内的日志
            LogLine.get(start, end, (logs: any) => {
                if (callback) {
                    callback(logs)
                } else {
                    console.log(logs)
                }
            })
        } else if (start && !end) {
            // 获取start天内的日志
            LogLine.get(start, (logs: any) => {
                if (callback) {
                    callback(logs)
                } else {
                    console.log(logs)
                }
            })
        } else {
            // 获取所有日志
            LogLine.all((logs: any) => {
                if (callback) {
                    callback(logs)
                } else {
                    console.log(logs)
                }
            })
        }
    },
    // clear log
    cleanLog (): void {
        LogLine.clean()
    }
}

const setReqCache = (cacheId: string, data: any) => {
    let dataString
    try {
        dataString = JSON.stringify(data)
        localStorage.setItem(cacheId, dataString)
    } catch (e) {
        localStorage.setItem(cacheId, data)
    }
}

const getReqCache = (cacheId: string, queryUrl: string) => {
    const cacheData = localStorage.getItem(cacheId)
    if (cacheData) {
        console.log(`%c '${queryUrl}': this request's response data is from local cache.`, 'color: red;')
        return JSON.parse(cacheData)
    }
    return false
}

const dealReqCache = (cacheId: string, response: any) => {
    // cache local res data
    try {
        setReqCache(cacheId, response)
        return response
    } catch (e) {
        if (/Failed to execute 'setItem' on 'Storage'/.test(e)) {
            // need to clean cache storage
            Object.keys(localStorage).forEach((key: string) => {
                if (/near_cache/.test(key)) {
                    localStorage.removeItem(key)
                }
            })
            // set and return data
            setReqCache(cacheId, response)
            return response
        }
        logLineObj.setLog({
            logType: 'error',
            desc: 'storage fail',
            data: {
                message: e
            }
        })
        return response
    }
}

axios.interceptors.request.use(
    (config: any) => {
        NProgress.start()
        return config
    },
    (error: any) => Promise.reject(error)
)

axios.interceptors.response.use(
    (response: any) => {
        NProgress.done()
        // check if headers had local-cache
        if (response.config.headers && response.config.headers['local-cache']) {
            // try to get cache by params cache id
            let params
            if (response.config.method === 'get' || response.config.method === 'delete') {
                const defaultParams = typeof response.config.params === 'string' ? response.config.params : JSON.stringify(response.config.params)
                params = response.config.params ? defaultParams : ''
            } else {
                const defaultParams = typeof response.config.data === 'string' ? response.config.data : JSON.stringify(response.config.data)
                params = response.config.data ? defaultParams : ''
            }
            const cacheId = `near_cache_${md5([params, response.config.url].join('@cache@'))}`
            return dealReqCache(cacheId, response)
        }
        return response
    },
    (error: any) => Promise.reject(error)
)

const checkChinesePhone = (phone: string) => {
    const reg = /^1[3456789]\d{9}$/
    return reg.test(phone)
}

const sendReq = async (params: ReqType) => {
    // check url
    if (!params.url) {
        return false
    }
    // set default value
    params.headers = params.headers || {}
    params.headers['Content-Type'] = params.headers['Content-Type'] || 'application/json'
    params.timeout = params.timeout || 20000
    params.method = params.method || 'POST'
    params.responseType = params.responseType || 'json'
    // if form-data, transfer data
    if (params.headers['Content-Type'] === 'application/x-www-form-urlencoded') {
        params.data = qs.stringify(params.data)
    }
    const rCfg: AxiosRequestConfig = {
        headers: params.headers,
        responseType: params.responseType,
        timeout: params.timeout
    }
    let result: any
    if (params.headers['local-cache']) {
        const data = params.data ? JSON.stringify(params.data) : ''
        const cacheId = `near_cache_${md5([data, params.url].join('@cache@'))}`
        result = getReqCache(cacheId, params.url)
    }
    if (params.method === 'POST') {
        try {
            if (!result) {
                result = await axios.post(params.url, params.data, rCfg)
            }
            const resData = result.data
            const resCode = resData.code
            const mainData = resData.data
            if (resCode === 0) {
                if (params.success) {
                    params.success(mainData)
                } else {
                    console.log('request successful')
                }
            } else {
                logLineObj.setLog({
                    logType: 'error',
                    desc: 'api fail',
                    data: {
                        message: resData.message,
                        params,
                        response: resData
                    }
                })
                if (params.fail) {
                    params.fail(resData)
                } else {
                    console.log('request fail')
                }
            }
            return resData
        } catch (e) {
            logLineObj.setLog({
                logType: 'error',
                desc: 'request error',
                data: {
                    message: e,
                    params
                }
            })
            if (params.error) {
                params.error(e)
            } else {
                console.log('request error')
            }
            return e
        }
    } else if (params.method === 'GET') {
        try {
            const getParams = {
                ...{ params: params.data },
                ...rCfg
            }
            if (!result) {
                result = await axios.get(params.url, getParams)
            }
            const resData = result.data
            const resCode = resData.code
            const mainData = resData.data
            if (resCode === 0) {
                if (params.success) {
                    params.success(mainData)
                } else {
                    console.log('request successful')
                }
            } else {
                logLineObj.setLog({
                    logType: 'error',
                    desc: 'api fail',
                    data: {
                        message: resData.message,
                        params,
                        response: resData
                    }
                })
                if (params.fail) {
                    params.fail(resData)
                } else {
                    console.log('request fail')
                }
            }
            return resData
        } catch (e) {
            logLineObj.setLog({
                logType: 'error',
                desc: 'request error',
                data: {
                    message: e,
                    params
                }
            })
            if (params.error) {
                params.error(e)
            } else {
                console.log('request error')
            }
            return e
        }
    } else if (params.method === 'PUT') {
        try {
            if (!result) {
                result = await axios.put(params.url, params.data, rCfg)
            }
            const resData = result.data
            const resCode = resData.code
            const mainData = resData.data
            if (resCode === 0) {
                if (params.success) {
                    params.success(mainData)
                } else {
                    console.log('request successful')
                }
            } else {
                logLineObj.setLog({
                    logType: 'error',
                    desc: 'api fail',
                    data: {
                        message: resData.message,
                        params,
                        response: resData
                    }
                })
                if (params.fail) {
                    params.fail(resData)
                } else {
                    console.log('request fail')
                }
            }
            return resData
        } catch (e) {
            logLineObj.setLog({
                logType: 'error',
                desc: 'request error',
                data: {
                    message: e,
                    params
                }
            })
            if (params.error) {
                params.error(e)
            } else {
                console.log('request error')
            }
            return e
        }
    } else if (params.method === 'DELETE') {
        try {
            const getParams = {
                ...{ params: params.data },
                ...rCfg
            }
            if (!result) {
                result = await axios.delete(params.url, getParams)
            }
            const resData = result.data
            const resCode = resData.code
            const mainData = resData.data
            if (resCode === 0) {
                if (params.success) {
                    params.success(mainData)
                } else {
                    console.log('request successful')
                }
            } else {
                logLineObj.setLog({
                    logType: 'error',
                    desc: 'api fail',
                    data: {
                        message: resData.message,
                        params,
                        response: resData
                    }
                })
                if (params.fail) {
                    params.fail(resData)
                } else {
                    console.log('request fail')
                }
            }
            return resData
        } catch (e) {
            logLineObj.setLog({
                logType: 'error',
                desc: 'request error',
                data: {
                    message: e,
                    params
                }
            })
            if (params.error) {
                params.error(e)
            } else {
                console.log('request error')
            }
            return e
        }
    } else {
        return false
    }
}

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

const getCurTabIdx = (tabList: any[], tabKey: string) => {
    let curTabIdx = -1
    tabList.forEach((item: any, idx: number) => {
        if (item.key === tabKey) {
            curTabIdx = idx
        }
    })
    return curTabIdx
}

const deepClone = (obj) => {
    if (typeof obj !== 'object' || obj === null) {
        return obj
    }

    if (obj instanceof Date) {
        return new Date(obj.getTime())
    }

    if (obj instanceof Array) {
        return obj.reduce((arr, item, i) => {
            arr[i] = deepClone(item)
            return arr
        }, [])
    }

    if (obj instanceof Object) {
        return Object.keys(obj).reduce((newObj, key) => {
            newObj[key] = deepClone(obj[key])
            return newObj
        }, {})
    }

    return JSON.parse(JSON.stringify(obj))
}

export default {
    checkChinesePhone,
    sendReq,
    randomCharacter,
    setCacheLocalStorage,
    getCacheLocalStorage,
    getCurTabIdx,
    logLineObj,
    deepClone
}
