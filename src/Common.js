const path = require('path')
const glob = require('glob')

export class Commnon {

    viewsSrc = this.findPath(__dirname, 'source/Application/views')
    outSrc = this.findPath(__dirname, 'source/out')
    moduelSrc = this.findPath(__dirname, 'source/out/assets/modules')
    themeSrc = this.findPath(__dirname, 'source/out/assets/themes')

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