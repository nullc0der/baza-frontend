// import get from 'lodash/get'
import moment from 'moment'

function randomDate(start, end) {
    return new Date(
        start.getTime() + Math.random() * (end.getTime() - start.getTime())
    )
}

export function generateRandomDate(i) {
    var start = moment().subtract(1, 'hour')
    var end = moment()

    return randomDate(start.toDate(), end.toDate())
}

export function getOnlineStatus(status) {
    switch (status) {
        case 'Online':
            return 'is-online'
        case 'Away':
            return 'is-away'
        default:
            return 'is-idle'
    }
}

export function getImageURLFromFile(file) {
    if (!file) {
        return Promise.reject(new Error('No file received'))
    }
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = function() {
            resolve(reader.result)
        }
        reader.readAsDataURL(file)
    })
}

export function matchStr(s1, s2) {
    s1 = (s1 + '').replace(/\s/g, '').toLowerCase()
    s2 = (s2 + '').replace(/\s/g, '').toLowerCase()

    return s1 === s2
}

export function imageToDataURL(imageSrc) {
    const img = document.createElement('img')
    img.crossOrigin = 'Anonymous'
    const canvas = document.createElement('canvas')

    return new Promise((resolve, reject) => {
        img.onload = function() {
            canvas.height = img.naturalHeight
            canvas.width = img.naturalWidth

            let ctx = canvas.getContext('2d')
            ctx.drawImage(img, 0, 0)
            resolve(canvas.toDataURL())
        }

        img.onerror = function() {
            reject(new Error('Cannot load image'))
        }

        img.src = imageSrc
    })
}

export function dataURLtoBlob(dataURL) {
    // convert base64 to raw binary data held in a string
    var byteString = atob(dataURL.split(',')[1])

    // separate out the mime component
    var mimeString = dataURL
        .split(',')[0]
        .split(':')[1]
        .split(';')[0]

    // write the bytes of the string to an ArrayBuffer
    var arrayBuffer = new ArrayBuffer(byteString.length)
    var _ia = new Uint8Array(arrayBuffer)
    for (var i = 0; i < byteString.length; i++) {
        _ia[i] = byteString.charCodeAt(i)
    }

    var dataView = new DataView(arrayBuffer)
    var blob = new Blob([dataView], { type: mimeString })
    return blob
}

export function imageToBlob(imageSrc) {
    return imageToDataURL(imageSrc).then(dataURLtoBlob)
}

// export function selectState(namespaceKey, childProps) {
//   return function selectFromReduxState(state) {
//     const namespace = get(state, namespaceKey, {})
//     const expandedProps = Object.keys(childProps).reduce((result, key)=>{

//       return result
//     }, {})
//     return expandedProps
//   }
// }

export function getUsername(profile) {
    let username = ''
    if (typeof profile !== 'undefined') {
        if (profile.hasOwnProperty('username')) {
            username = profile.username
        }
        if (profile.hasOwnProperty('user')) {
            username = profile.user.username
        }
    }
    return username
}
