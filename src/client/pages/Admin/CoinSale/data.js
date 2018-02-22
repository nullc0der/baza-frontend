// If coming through api. Link this to a redux store instead

export const CURRENCIES = [
  { name: 'USD', key: 'usd' },
  { name: 'INR', key: 'inr' },
  { name: 'GBP', key: 'gbp' },
  { name: 'YEN', key: 'yen' }
]

export const CONVERSION_TABLE = {
  usd: 0.00434,
  inr: 0.00043,
  gbp: 0.00123,
  yen: 0.00092
}
