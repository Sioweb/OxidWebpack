import { Common } from 'Common'

export class Theme extends Common {
    type = 'child'
    name = ''

    defaultEntryPoint = 'entry/main.js'

    defaultScriptName = 'src/js/scripts.min'

    defaultScrips = [
        'jquery',
        'jquery-ui',
        'jquery.cookie',
        'bootstrap'
    ]

    constructor(options) {
        for (let o in options) {
            if (this[o] !== undefined && typeof this[o] !== 'function') {
                this[o] = options[o]
            }
        }
    }

    getCommonEntries(entries) {

        if (this.type !== 'root') {
            glob.sync(themeSrc(this.name, 'js/*.js')).forEach(function (widget) {
                entries[this.defaultScriptName].push(widget);
            });
            glob.sync(themeSrc(this.name, 'js/**/*.js')).forEach(function (widget) {
                entries[this.defaultScriptName].push(widget);
            });
        }
        glob.sync(themeSrc(this.name, 'js/**/*.js')).forEach(function (widget) {
            entries[this.defaultScriptName].push(widget);
        });
        glob.sync(moduelSrc('**/js/*.js')).forEach(function (widget) {
            entries[this.defaultScriptName].push(widget);
        });
        glob.sync(themeSrc(this.name, 'less/*.less')).forEach(function (widget) {
            entries[this.defaultScriptName].push(widget);
        });
        glob.sync(themeSrc(this.name, 'scss/*.scss')).forEach(function (widget) {
            entries[this.defaultScriptName].push(widget);
        });
        glob.sync(themeSrc(this.name, 'css/*.css')).forEach(function (widget) {
            entries[this.defaultScriptName].push(widget);
        });
        glob.sync(moduelSrc('**/less/*.less')).forEach(function (widget) {
            entries[this.defaultScriptName].push(widget);
        });
        glob.sync(moduelSrc('**/scss/*.scss')).forEach(function (widget) {
            entries[this.defaultScriptName].push(widget);
        });
        glob.sync(moduelSrc('**/css/*.css')).forEach(function (widget) {
            entries[this.defaultScriptName].push(widget);
        });

        entries[this.defaultScriptName].push(themeSrc(this.name, 'entry/main.js'))
        if (this.type !== 'root') {
            entries[this.defaultScriptName].push(themeSrc(this.name, 'entry/main_after.js'))
        }
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

    importGlobals() {
        let entries = {};
        glob.sync(this.themeSrc('', '*')).forEach(function (widget) {
            let theme = widget.substring(widget.lastIndexOf('/') + 1)

            entries[theme + 'Path'] = '"' + widget + '"'

            glob.sync(this.themeSrc(theme, '**/**/__*.' + type)).forEach(function (widget, matches) {
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