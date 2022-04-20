import { h } from 'vue'
import {
    NButton,
} from 'naive-ui'
import i18n from '@colocale/lang'
import moment from 'moment'

export default {
    validateButton: {
        unableValidate: 'validateButton.unableValidate',
        getValidateCode: 'validateButton.getValidateCode',
    },
    tagObj: {
        closeAll: 'tagObj.closeAll',
        closeCur: 'tagObj.closeCur',
        closeOther: 'tagObj.closeOther',
        closeRight: 'tagObj.closeRight',
        singlePage: 'tagObj.singlePage',
        refreshPage: 'tagObj.refreshPage',
        affixPage: 'tagObj.affixPage',
        cancelAffixPage: 'tagObj.cancelAffixPage',
        errorTip: {
            homePageCloseError: 'tagObj.errorTip.homePageCloseError',
            affixPageCloseError: 'tagObj.errorTip.affixPageCloseError',
            homePageAffixError: 'tagObj.errorTip.homePageAffixError'
        },
        checkSave: 'tagObj.checkSave',
        cancelClose: 'tagObj.cancelClose'
    },
    modalObj: {
        tip: 'modalObj.tip',
        warn: 'modalObj.warn',
        confirm: 'modalObj.confirm',
        yes: 'modalObj.yes',
        no: 'modalObj.no',
    },
    userPanel: {
        frontendLog: 'userPanel.frontendLog',
        customSetting: 'userPanel.customSetting',
        cleanConfig: 'userPanel.cleanConfig',
        cleanCache: 'userPanel.cleanCache',
    },
    searchPanel: {
        expandText: 'searchPanel.expandText',
        resetText: 'searchPanel.resetText',
        searchText: 'searchPanel.searchText',
        collapseText: 'searchPanel.collapseText',
    },
    comTip: {
        notFoundModule: 'comTip.notFoundModule'
    },
    logLine: {
        timeArea: 'logLine.timeArea',
        tableTitle: 'logLine.tableTitle',
        tableColumn: {
            index: 'logLine.tableColumn.index'
        },
        extra: {
            view: 'logLine.extra.view',
            logDetail: 'logLine.extra.logDetail',
            logLevel: 'logLine.extra.logLevel',
            logType: 'logLine.extra.logType',
            logDesc: 'logLine.extra.logDesc',
            requestDetail: 'logLine.extra.requestDetail',
            clearLog: 'logLine.extra.clearLog',
            clearLogSuccess: 'logLine.extra.clearLogSuccess',
        }
    },
    comTable: {
        allPick: 'comTable.allPick',
    },
    errorPage: {
        errorTip: {
            notFoundTip: 'errorPage.errorTip.notFoundTip',
            notRightTip: 'errorPage.errorTip.notRightTip',
            noServiceTip: 'errorPage.errorTip.noServiceTip'
        },
        btnText: 'errorPage.btnText'
    },
    guide: {
        pageComponent: {
            currentCp: 'guide.pageComponent.currentCp',
            tableTitle: 'guide.pageComponent.tableTitle',
            paramKey: 'guide.pageComponent.paramKey',
            paramValue: 'guide.pageComponent.paramValue',
            isAffix: 'guide.pageComponent.isAffix',
            pageUrl: 'guide.pageComponent.pageUrl',
            pageApi: 'guide.pageComponent.pageApi',
            addPage: 'guide.pageComponent.addPage',
            refreshPage: 'guide.pageComponent.refreshPage',
            closePage: 'guide.pageComponent.closePage',
            state: 'guide.pageComponent.state',
            func: 'guide.pageComponent.func',
            example: 'guide.pageComponent.example',
            description: 'guide.pageComponent.description',
            exampleCode: 'guide.pageComponent.exampleCode',
        },
        i18nInternational: {
            supportLang: {
                tip: 'guide.i18nInternational.supportLang.tip',
            }
        },
        applicationConfig: {
            applicationConfig: 'guide.applicationConfig.applicationConfig',
            pageConfig: 'guide.applicationConfig.pageConfig',
            contextDir: 'guide.applicationConfig.contextDir',
            pageConfigDesc: 'guide.applicationConfig.pageConfigDesc',
        }
    },
    staticList: {
        logTimeList: [
            {
                label: 'logTimeList.halfDay',
                value: '.5d',
                key: '.5d'
            },
            {
                label: 'logTimeList.fullDay',
                value: '1d',
                key: '1d'
            },
            {
                label: 'logTimeList.weekDay',
                value: '7d',
                key: '7d'
            },
            {
                label: 'logTimeList.monthDay',
                value: '30d',
                key: '30d'
            }
        ],
        pageComponentExampleList: [
            {
                state: 'core/store/index',
                func: 'addCurTab',
                description: 'guide.pageComponent.addPage',
                code: `import costore from '@costore/index'
                
const coStore = costore()

coStore.addCurTab({
    component: 'logline/LogLine',
    label: option.label,
    key: utils.randomCharacter(32),
    params: {
        apiNew: true
    }
})
 `
            },
            {
                state: 'core/store/index',
                func: 'closeTab',
                description: 'guide.pageComponent.closePage',
                code: `import costore from '@costore/index'
                
const coStore = costore()

coStore.closeTab(1)
 `
            },
            {
                state: 'core/store/index',
                func: 'refreshTab',
                description: 'guide.pageComponent.refreshPage',
                code: `import costore from '@costore/index'
                
const coStore = costore()

coStore.refreshTab()
 `
            }
        ]
    },
    tableColumns: (comTableObj, eventMap?: any) => {
        const columnsMap = {
            logLineTable: [
                {
                    title: () => i18n.t('logLine.tableColumn.index'),
                    key: 'index',
                    width: 60,
                    ellipsis: true,
                    fixed: 'left',
                    render (rowData: any, rowIndex: number) {
                        return (comTableObj.value.pagingInfo.page - 1) * comTableObj.value.pagingInfo.pageSize + rowIndex + 1
                    }
                },
                {
                    title: () => i18n.t('logLine.tableColumn.desc'),
                    key: 'descriptor',
                    ellipsis: true,
                    resizable: true,
                },
                {
                    title: () => i18n.t('logLine.tableColumn.type'),
                    key: 'namespace',
                    ellipsis: true,
                    width: 120,
                    resizable: true,
                },
                {
                    title: () => i18n.t('logLine.tableColumn.time'),
                    key: 'time',
                    width: 190,
                    resizable: true,
                    ellipsis: true,
                    render (rowData: any) {
                        return moment(rowData.time).format('YYYY-MM-DD HH:mm:ss')
                    }
                },
                {
                    title: () => i18n.t('logLine.tableColumn.op'),
                    key: 'op',
                    width: 70,
                    align: 'center',
                    ellipsis: true,
                    render (row) {
                        return h(NButton, {
                            class: 'n-link-btn unset-height',
                            quaternary: true,
                            type: 'primary',
                            tag: 'a',
                            onClick: () => {
                                eventMap.showDetail(row)
                            }
                        }, i18n.t('logLine.extra.view'))
                    }
                }
            ],
            pageComponentTable: [
                {
                    title: () => i18n.t('logLine.tableColumn.index'),
                    key: 'index',
                    width: 60,
                    ellipsis: true,
                    fixed: 'left',
                    render (rowData: any, rowIndex: number) {
                        return rowIndex + 1
                    }
                },
                {
                    title: () => i18n.t('guide.pageComponent.paramKey'),
                    key: 'key',
                    width: 150,
                    ellipsis: true,
                    resizable: true,
                    render (rowData: any) {
                        if (!rowData.key) {
                            return i18n.t('guide.pageComponent.paramKey')
                        }
                        return i18n.t(rowData.key)
                    }
                },
                {
                    title: () => i18n.t('guide.pageComponent.paramValue'),
                    key: 'value',
                    ellipsis: true,
                    resizable: true,
                    render (rowData: any) {
                        if (!rowData.value) {
                            return i18n.t('guide.pageComponent.paramValue')
                        }
                        return i18n.t(rowData.value)
                    }
                },
            ],
            pageComponentApiTable: [
                {
                    title: () => i18n.t('logLine.tableColumn.index'),
                    key: 'index',
                    width: 60,
                    ellipsis: true,
                    fixed: 'left',
                    render (rowData: any, rowIndex: number) {
                        return rowIndex + 1
                    }
                },
                {
                    title: () => i18n.t('guide.pageComponent.state'),
                    key: 'state',
                    width: 150,
                    ellipsis: true,
                    resizable: true
                },
                {
                    title: () => i18n.t('guide.pageComponent.func'),
                    key: 'func',
                    width: 150,
                    ellipsis: true,
                    resizable: true
                },
                {
                    title: () => i18n.t('guide.pageComponent.description'),
                    key: 'description',
                    ellipsis: true,
                    resizable: true,
                    render (rowData: any) {
                        return i18n.t(rowData.description)
                    }
                },
                {
                    title: () => i18n.t('guide.pageComponent.example'),
                    key: 'example',
                    width: 100,
                    ellipsis: true,
                    resizable: true,
                    align: 'center',
                    render (row) {
                        return h(NButton, {
                            class: 'n-link-btn unset-height',
                            quaternary: true,
                            type: 'primary',
                            tag: 'a',
                            onClick: () => {
                                eventMap.showExample(row)
                            }
                        }, i18n.t('logLine.extra.view'))
                    }
                },
            ],
        }
        return columnsMap
    },
    defaultPagination: {
        page: 1,
        pageSize: 30,
        showSizePicker: true,
        pageSizes: [10, 30, 50, 100, 300, 500]
    }
}
