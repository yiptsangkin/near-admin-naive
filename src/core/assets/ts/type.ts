// Hot Key
interface HotKeyDetailConfig {
    name: string,
    method: any,
    params?: any
}

interface HotKeyEffectPath {
    [key: string]: HotKeyDetailConfig[]
}

export interface HotKeyConfig {
    [key: string]: HotKeyEffectPath
}

export interface HadKey {
    isKey: boolean,
    name: string
}

interface BuildSwitch {
    isMock: boolean,
    isHotKey: boolean,
    isBreadCrumb: boolean,
    isCache: boolean,
    isI18n: boolean
}

// Request
export interface ReqType {
    headers?: any,
    responseType?: | 'arraybuffer' | 'blob' | 'document' | 'json' | 'text' | 'stream',
    method?: string,
    timeout?: number,
    data?: any,
    url?: string,
    success?: any,
    fail?: any,
    error?: any
}

// Response
export interface ResType {
    code: number,
    data: any,
    message: string,
    timestamp: number
}

// Common Response
export interface ComRespone {
    code: number,
    message: string,
    timestamp: number,
    data: any
}

// Menu List
export interface NavList {
    name: string,
    path?: string,
    icon?: string | {
        value: string,
        type: 'common' | 'aicon'
    },
    groupName?: string,
    params?: any,
    child?: NavList[]
}

export interface MenuList {
    menuList: NavList[]
}

interface CpParams {
    apiNew?: boolean,
    withoutCache?: boolean,
    isAffix?: boolean,
    checkSave?: boolean,
    pageUrl?: string
}

export interface CpInfo {
    component: string,
    label: string,
    params?: CpParams,
    key?: string | number | boolean,
    asyncComponent?: any,
    breadList?: any[]
}

export interface GetLogLineParams {
    start?: string,
    end?: string,
    callback?: any
}

export interface LogLineParams {
    module?: string,
    logType: string,
    desc: string,
    data: any
}

interface ComTableBtn {
    name: string,
    method: string,
    icon?: string,
    type?: string
}

export interface OperationBar {
    btnList?: ComTableBtn[],
    title: string
}

export interface MultiSelectColumn {
    title: string,
    field: string,
    width?: string | number
}

export interface ComTable {
    btnList?: ComTableBtn[],
    columns: any,
    data: any[],
    title: string,
    pagingInfo: any
}
