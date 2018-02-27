import { WalletAccounts } from 'models/WalletAccount'

export function getAll(req, res, next) {
  res.json({
    status: 'success',
    statusCode: 200,
    results: WalletAccounts
  })
}
