export default {
    locale: 'en',
    country: 'US',
    loginPanel: {
        validateTip: 'Verification code',
        accountLogin: 'Account password login',
        phoneLogin: 'Mobile phone number login',
        accountPhd: 'Please enter your mobile number / account',
        passwordPhd: 'Please enter your password',
        validateCodePhd: 'please enter verification code',
        loginBtn: 'Log in',
        autoLogin: 'auto login',
        forgetPwd: 'Forgot password',
        accountReq: 'Mobile phone number / account cannot be empty',
        passwordReq: 'password can not be blank',
        validateCodeReq: 'verification code must be filled'
    },
    menuObj: {
        homePage: 'front page',
        'menu-0': 'basic function',
        'menu-1': 'Component use',
        'menu-0-0': 'Technical selection',
        'menu-0-0-0': 'Vue3.x',
        'menu-0-0-1': 'Naiveui',
        'menu-0-0-2': 'Pinia',
        'menu-0-0-3': 'Near-admin',
        'menu-1-0': 'Built-in component',
        'menu-1-0-0': 'Search panel',
        'menu-1-0-1': 'General form',
        'menu-0-1': 'Frame function',
        'menu-0-1-0': 'Page component',
        'menu-0-1-0-0': 'Component page',
        'menu-0-1-0-1': 'URL page',
        'menu-0-1-1': 'Built-in function',
        'menu-0-1-1-0': 'Project configuration',
        'menu-0-1-1-1': 'globalization'
    },
    localeMap: {
        ar: 'Arabic',
        bg: 'Bulgarian',
        ca: 'Catalonia',
        cs: 'Czech',
        da: 'Danish',
        de: 'German',
        el: 'Greek',
        'en-gb': 'English',
        en: 'English',
        es: 'Spanish',
        et: 'Estonian',
        fa: 'Persian',
        fi: 'Finnish',
        fr: 'French',
        he: 'Hebrew',
        hi: 'Hindi',
        hr: 'Croatian',
        hu: 'Hungarian',
        hy: 'Armenian',
        id: 'Indonesian language',
        is: 'Icelandic language',
        it: 'Italian ',
        ja: 'Japanese',
        kn: 'Kanada',
        ko: 'Korean',
        'ku-iq': 'Central Kurdue',
        lv: 'Central Kurdue',
        mk: 'Macedonian',
        'mn-mn': 'Mongolian',
        'ms-my': 'Malay',
        nb: 'Norwegian language',
        'ne-np': 'Nepalese',
        'nl-be': 'Flan language',
        nl: 'Dutch',
        pl: 'Polish',
        'pt-br': 'Brazilian Portuguese',
        pt: 'Europe Portuguese',
        ro: 'Romanian',
        ru: 'Russian language',
        sk: 'Slovak',
        sl: 'Slovenian',
        sr: 'Serbian',
        sv: 'Swedish language',
        ta: 'Tamil',
        th: 'Thai',
        tr: 'Turkish',
        uk: 'Ukrainian',
        vi: 'Vietnamese',
        'zh-cn': 'Simplified Chinese',
        'zh-tw': 'traditional Chinese'
    },
    sysInfo: {
        description: 'Wood-based neutral development framework based on Vue3 and Naiveui'
    },
    validateButton: {
        unableValidate: 'Mobile phone number is empty or does not meet the rules',
        getValidateCode: 'get verification code'
    },
    tagObj: {
        closeAll: 'Close all labels',
        closeCur: 'Close the current label',
        closeOther: 'Close other labels',
        closeRight: 'Close the right label',
        singlePage: 'Stand-alone page',
        refreshPage: 'refresh page',
        affixPage: 'Fixed page',
        cancelAffixPage: 'Cancel fixation',
        errorTip: {
            homePageCloseError: 'Home is not allowed to close',
            affixPageCloseError: 'The fixed page is not allowed to close',
            homePageAffixError: 'Home cannot be canceled'
        },
        checkSave: 'Do you close the page? (Please make sure the red label page content has been saved)',
        cancelClose: 'Closed operation'
    },
    modalObj: {
        tip: 'hint',
        warn: 'warn',
        confirm: 'confirm',
        yes: 'Yes',
        no: 'no'
    },
    userPanel: {
        frontendLog: 'Front-end log',
        customSetting: 'Personalized setting',
        cleanConfig: 'Clear configuration',
        cleanCache: 'clear cache'
    },
    searchPanel: {
        expandText: 'Unfold',
        collapseText: 'Put away',
        resetText: 'Reset',
        searchText: 'Inquire'
    },
    comTip: {
        notFoundModule: 'Can\'t find the module:'
    },
    logLine: {
        timeArea: 'time limit',
        tableTitle: 'Log list',
        tableColumn: {
            index: 'Serial number',
            desc: 'Log description',
            type: 'Log type',
            time: 'time',
            op: 'operate'
        },
        extra: {
            view: 'Check',
            logDetail: 'Logging',
            logLevel: 'Log level',
            logType: 'Log type',
            logDesc: 'Log description',
            requestDetail: 'Request details',
            clearLog: 'Empty log',
            clearLogSuccess: 'Successful'
        }
    },
    logTimeList: {
        halfDay: 'Half a day',
        fullDay: 'in one day',
        weekDay: 'within a week',
        monthDay: 'Within a month'
    },
    comTable: {
        allPick: 'select all'
    },
    errorPage: {
        errorTip: {
            notFoundTip: 'Sorry, the page you visited does not exist.',
            notRightTip: 'Sorry, you have no permission to access this page.',
            noServiceTip: 'Sorry, the server has a problem, please try again later'
        },
        btnText: 'Close page'
    },
    guide: {
        pageComponent: {
            currentCp: 'Current component',
            tableTitle: 'Page',
            paramKey: 'Parameter key',
            paramValue: 'Parameter value',
            tip: 'The parameter of the page component can be performed by the parameter parameter of the component entity.',
            checkSave: '<Boolean> `checksave` indicates whether to throw a prompt when it is closed',
            apiNew: '<Boolean> `Apinew` indicates whether to verify the page',
            isAffix: '<Boolean> `isaffix` indicates whether the current page is fixed',
            pageUrl: '<String> `PageURL` indicates the external chain address of the page component',
            pageApi: 'Page Operation API',
            addPage: 'New page',
            refreshPage: 'refresh page',
            closePage: 'Close page',
            state: 'state',
            func: 'method',
            example: 'example',
            description: 'describe',
            exampleCode: 'Sample code'
        },
        i18nInternational: {
            supportLang: {
                tip: 'Current support language'
            }
        },
        applicationConfig: {
            applicationConfig: 'Application configuration',
            pageConfig: 'SPA configuration',
            contextDir: 'If the package needs to increase the secondary directory of the app name, you can modify the two file publicPath variables in Build / Config.js and SRC / Custom / Assets / TS / Config.ts.',
            pageConfigDesc: 'The content in Page.config.json will be rendered in public / Basic.html. The currently supported Type has CSS. JS can be loaded in this way for some larger third-party libraries such as Babylonjs.'
        }
    }
}
