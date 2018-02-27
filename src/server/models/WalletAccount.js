import _ from 'lodash'
import Joi from 'joi'
import Felicity from 'felicity'
import faker from 'faker'

// Schema for validation
export const WalletAccountSchema = Joi.object().keys({
  id: Joi.string()
    .uuid()
    .required(),
  name: Joi.string()
    .alphanum()
    .valid('Coin A', 'Coin B', 'Coin C', 'Coin D')
    .required(),
  image: Joi.string().required()
})

// Sample Data Generator
export const WalletAccountGenerator = Felicity.entityFor(WalletAccountSchema)

// Sample Data
export const WalletAccounts = _.range(4).map(x => {
  return {
    ...WalletAccountGenerator.example(),
    image: faker.image.avatar()
  }
})
