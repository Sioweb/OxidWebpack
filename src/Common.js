const path = require('path')

class Common {

    dir = '';

    constructor(options) {
        for (let o in options) {
            if (this[o] !== undefined && typeof this[o] !== 'function') {
                this[o] = options[o]
            }
        }
    }

    viewsSrc = this.findPath(this.dir, 'source/Application/views')
    outSrc = this.findPath(this.dir, 'source/out')
    moduleSrc = this.findPath(this.dir, 'source/out/assets/modules')
    themeSrc = this.findPath(this.dir, 'source/out/assets/themes')

    findPath() {
        const locations = Array.from(arguments)
        function f() {
            // yo, I heard you like varargs
            const segments = locations.concat(Array.from(arguments))
            return path.resolve.apply(null, segments)
        }

        return f
    }
}

module.exports = Common;