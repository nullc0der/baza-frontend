const toClean = [
    'mini-css-extract-plugin'
]

class CleanStatsPlugin {
    shouldClean(child) {
        return toClean.some(match => child.name.indexOf(match) !== 0)
    }

    apply(compiler) {
        compiler.hooks.done.tap('CleanStatsPlugin', stats => {
            const children = stats.compilation.children
            if (Array.isArray(children)) {
                stats.compilation.children = children.filter(this.shouldClean)
            }
        })
    }
}

module.exports = CleanStatsPlugin
