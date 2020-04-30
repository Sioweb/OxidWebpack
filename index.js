import { Common, Theme } from './src/index'

export default class OxWebpackConfig extends Common {

    Themes = [
        new Theme({ type: 'root', name: 'ci' }),
        new Theme({ type: 'child', name: 'seipp' }),
        new Theme({ type: 'child', name: 'gaertner' }),
    ]

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

    loadConfig = function () {
        return {
            themes: this.Themes
        }
    }

    getCommonEntries(theme) {
        let entries = theme.getDefaultScripts()
        return theme.getCommonEntries(entries)
    }

    importGlobals(oTheme, type = 'less') {
        return oTheme.importGlobals(oTheme, type)
    }

    getProvidetPlugins() {
        return {
            overlib: "overlib"
        }
    }

    getPluginAlias() {
        return {
            'jquery': 'jquery/src/jquery'
        }
    }
}