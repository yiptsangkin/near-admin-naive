const publicPath = 'near-admin'

export default {
    apiHost: '',
    publicPath,
    sysInfo: {
        name: 'Near-Admin',
        logo: `/${publicPath}/static/images/logo/logo.svg`,
        noNeedCheckRightPath: ['home/HomePage'],
        settings: {
            isMock: true,
            isHotKey: true,
            isBreadCrumb: true,
            isCache: true,
            isI18n: true
        }
    }
}
