const Common = require('./src/Common');
const Theme = require('./src/Theme');

class OxWebpackConfig extends Common {

    RootTheme = null

    Themes = []

    filenessCache = []

    constructor(options, Themes) {
        super(options)
    }

    getTheme(options) {
        return new Theme(options)
    }

    isFile(file) {
        if (file in filenessCache) {
            return filenessCache[file]
        }
        var result = fs.existsSync(file) && fs.statSync(file).isFile()
        if (!process.env.BROWSERSLIST_DISABLE_CACHE) {
            filenessCache[file] = result
        }
        return result
    }

    getMode() {
        return 'development'
    }

    getOutputScriptName() {
        return '[name].js'
    }

    getOutputScriptChunkFileName() {
        return '[name].js'
    }

    getOutputStyleName() {
        return 'src/css/styles.min.css'
    }

    getOutputStyleChunkFileName() {
        return 'src/css/chunk-[id].css'
    }

    loadConfig () {
        return {
            theme: this.Themes
        }
    }

    getCommonEntries(theme) {
        let entries = theme.getDefaultScripts()
        return theme.getCommonEntries(entries)
    }

    importGlobals(oTheme, type = 'less') {
        return oTheme.importGlobals(type)
    }

    getProvidedPlugins() {
        return {
            overlib: 'overlib'
        }
    }

    getPluginAlias() {
        return {
            'jquery': 'jquery/src/jquery'
        }
    }
}

module.exports = OxWebpackConfig;