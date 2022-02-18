const fs = require('fs')
const config = require('./config')
const chalk = require('chalk')

module.exports = {
    createApiConfigFile () {
        const self = this
        const curPath = process.cwd().replace('/script',  '')
        const publicJs  = `${curPath}/public/static/js`
        const comApiContent = `var apiConfig = { apiHost: '' }`
        config.envList.forEach((item) => {
            const targetPath = `${publicJs}/apiConfig${self.upperFirstCase(item)}.js`
            if (!fs.existsSync(targetPath)) {
                fs.writeFileSync(targetPath, comApiContent)
            }
        })
        console.log(chalk.green('Create multiples environment api config successfully!'))
    },
    upperFirstCase (str) {
        if (str) {
            const charList = str.split('')
            charList[0] = charList[0].toUpperCase()
            return charList.join('')
        } else {
            return null
        }
    },
    getMultiEntries (globPath) {
        const self = this
        const entries = {}
        const rewrites = []
        let finalEntries = []
        const entriesListByCmd = process.env.ENTRIES ? process.env.ENTRIES.split(',') : []
        if (entriesListByCmd.length > 0) {
            finalEntries = entriesListByCmd
        } else {
            finalEntries = fs.readdirSync(globPath) || []
        }
        finalEntries.forEach((entry) => {
            const baseConfigFile = `../src/pages/${entry}/page.config.json`
            const baseConfig = require(baseConfigFile)
            baseConfig.childFolder = config.publicPath
            baseConfig.externals.apiconfig.url = [`/static/js/apiConfig${self.upperFirstCase(process.env.BUILD_ENV) || 'Dev'}.js`]
            entries[entry] = Object.assign({
                entry: `./src/pages/${entry}/main.ts`,
                template: `public/basic.html`,
                filename: `${entry}.html`
            }, baseConfig)
            if (baseConfig.childFolder) {
                rewrites.push(
                    {from: new RegExp(`^/${baseConfig.childFolder}/(${entry}|${entry}.html)/?.*`), to: `/${baseConfig.childFolder}/${entry}.html`}
                )
            } else {
                rewrites.push(
                    {from: new RegExp(`^/(${entry}|${entry}.html)/?.*`), to: `/${entry}.html`}
                )
            }

        })
        // visit root url, default first rewrite rule，for demo here is /auth/auth.html
        if (rewrites.length) {
            rewrites.push(
                {
                    from: new RegExp(`^/.*`),
                    to: rewrites[0].to
                }
            )
        }
        return {
            entries,
            rewrites
        }
    }
}
