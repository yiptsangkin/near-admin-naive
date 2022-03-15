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
                        }, '查看')
                    }
                }
            ]
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
