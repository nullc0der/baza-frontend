import _ from 'lodash'
import { WalletTransanctions } from 'models/WalletTransanction'

export function getAll(req, res, next) {
  const results = _.chain(WalletTransanctions)
    .shuffle()
    .take(_.random(0, WalletTransanctions.length / 2))
    .value()
  setTimeout(() => {
    res.json({
      status: 'success',
      statusCode: 200,
      results
    })
  }, 500)
}
