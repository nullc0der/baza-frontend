import _ from 'lodash'
import Felicity from 'felicity'
import Joi from 'joi'
import faker from 'faker'

import { WalletAccounts } from './WalletAccount'

export const WalletTransanctionSchema = Joi.object().keys({
  // Keep a separate uuid id for internal purposes
  // TransactionID though unique is long should not be exposed directly in urls
  id: Joi.string()
    .uuid()
    .required(),
  transanctionId: Joi.string()
    .token()
    .min(24)
    .max(24)
    .required(),
  from: Joi.object().keys({
    walletId: Joi.any()
      .valid(WalletAccounts.map(x => x.id))
      .required(),
    userId: Joi.string().required(),
    fullName: Joi.string().required()
  }),
  to: Joi.object().keys({
    walletId: Joi.number()
      .valid(WalletAccounts.map(x => x.id))
      .required(),
    userId: Joi.string().required(),
    fullName: Joi.string().required()
  }),
  description: Joi.string().required(),
  status: Joi.string()
    .valid('pending', 'executed', 'cancelled')
    .required(),
  date: Joi.date()
    .max('now')
    .required(),
  amount: Joi.number()
    .min(10000)
    .max(20000)
    .integer()
    .required()
})

// Sample Data Generator
export const WalletTransanctionGenerator = Felicity.entityFor(
  WalletTransanctionSchema
)

// Sample Data
export const WalletTransanctions = _.range(50).map(x => {
  var data = WalletTransanctionGenerator.example()
  data.from.fullName = `${faker.name.firstName()} ${faker.name.lastName()}`
  data.to.fullName = `${faker.name.firstName()} ${faker.name.lastName()}`
  data.description = faker.lorem.sentence()
  return data
})
