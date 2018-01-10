import _ from 'lodash'
import fs from 'fs-extra'
import crypto from 'crypto'
import chalk  from 'chalk'


// File Response Cache
export const FILE_RESPONSES_CACHE = {}
export const CachedFileResponse = (filePath)=> {
    const key = createMD5(filePath)

    // If file has been requested before, serve from cache
    if ( _.has(FILE_RESPONSES_CACHE, key) ){
        return Promise.resolve(FILE_RESPONSES_CACHE[key])
    }

    // First time the file is requested, we read and store in cache
    return fs.readFile(filePath).then(text => {
        FILE_RESPONSES_CACHE[key] = text
        console.log( chalk.yellow('Cached File Response: ' + filePath) )
        return text
    })
}

export const CachedFileResponseMiddleware = (filePath, mimeType) => (req, res, next)=> {
    CachedFileResponse(filePath)
    .then(file => {
        res.type(mimeType || 'text/plain').send(file)
    })
    .catch(err => next(err))
}

// Generate MD5 hash
export const createMD5 = (str = false)=> {
    if (!str)
        return
    crypto.createHash('md5').update(str).digest('hex');
}
