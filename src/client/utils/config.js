const Config = {}

Config.isPresent = (window && typeof window.BazaConfig !== 'undefined')

Config.get = (key) => {
    if (typeof key !== 'string') {
        throw new Error('Config `key` must be a string')
    }

    if (!Config.isPresent) {
        throw new Error('`Config` is not present. Please check server rendered page.')
    }

    return window.BazaConfig[key]
}


export default Config
