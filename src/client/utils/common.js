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
