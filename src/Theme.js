const Common = require('./Common');

const glob = require('glob')

class Theme extends Common {
    type = 'child'
    name = ''

    RootTheme = null

    defaultEntryPoint = 'entry/main.js'

    defaultScriptName = 'src/js/scripts.min'

    defaultScrips = [
        'jquery',
        'jquery-ui',
        'jquery.cookie',
        'bootstrap'
    ]

    constructor(options, RootTheme = null) {
        super(options)
        this.RootTheme = RootTheme
        
        for (let o in options) {
            if (this[o] !== undefined && typeof this[o] !== 'function') {
                this[o] = options[o]
            }
        }
    }

    getCommonEntries(entries) {
        let selfObj = this;

        if (selfObj.type !== 'root') {
            glob.sync(selfObj.themeSrc(selfObj.RootTheme.name, 'js/*.js')).forEach(function (widget) {
                entries[selfObj.defaultScriptName].push(widget);
            });
            glob.sync(selfObj.themeSrc(selfObj.RootTheme.name, 'js/**/*.js')).forEach(function (widget) {
                entries[selfObj.defaultScriptName].push(widget);
            });
        }
        // glob.sync(selfObj.themeSrc(selfObj.name, 'js/**/*.js')).forEach(function (widget) {
        //     entries[selfObj.defaultScriptName].push(widget);
        // });
        glob.sync(selfObj.moduleSrc('**/js/*.js')).forEach(function (widget) {
            entries[selfObj.defaultScriptName].push(widget);
        });
        glob.sync(selfObj.themeSrc(selfObj.name, 'less/*.less')).forEach(function (widget) {
            entries[selfObj.defaultScriptName].push(widget);
        });
        glob.sync(selfObj.themeSrc(selfObj.name, 'scss/*.scss')).forEach(function (widget) {
            entries[selfObj.defaultScriptName].push(widget);
        });
        glob.sync(selfObj.themeSrc(selfObj.name, 'css/*.css')).forEach(function (widget) {
            entries[selfObj.defaultScriptName].push(widget);
        });
        glob.sync(selfObj.moduleSrc('**/less/*.less')).forEach(function (widget) {
            entries[selfObj.defaultScriptName].push(widget);
        });
        glob.sync(selfObj.moduleSrc('**/scss/*.scss')).forEach(function (widget) {
            entries[selfObj.defaultScriptName].push(widget);
        });
        glob.sync(selfObj.moduleSrc('**/css/*.css')).forEach(function (widget) {
            entries[selfObj.defaultScriptName].push(widget);
        });

        entries[selfObj.defaultScriptName].push(selfObj.themeSrc(selfObj.name, 'entry/main.js'))
        if (selfObj.type !== 'root') {
            entries[selfObj.defaultScriptName].push(selfObj.themeSrc(selfObj.RootTheme.name, 'entry/main_after.js'))
        }

        return entries
    }

    getDefaultScripts(defaultScrips = []) {
        let Scripts = {};

        Scripts[this.defaultScriptName] = [];
        if (defaultScrips.length) {
            Scripts[this.defaultScriptName] = this.defaultScrips
        } else {
            Scripts[this.defaultScriptName] = defaultScrips
        }

        return Scripts
    }

    importGlobals(type = 'less') {
        let entries = {};
        let selfObj = this;
        glob.sync(selfObj.themeSrc('', '*')).forEach(function (widget) {
            let theme = widget.substring(widget.lastIndexOf('/') + 1)

            entries[theme + 'Path'] = '"' + widget + '"'

            glob.sync(selfObj.themeSrc(theme, '**/**/__*.' + type)).forEach(function (widget, matches) {
                let filename = widget.substring(widget.lastIndexOf('/') + 3)
                filename = filename.charAt(0).toUpperCase() + filename.slice(1)
                filename = theme + filename
                filename = filename.replace(/\..*/gm, '')

                entries[filename] = widget
            })
        })

        return entries
    }
}

module.exports = Theme;