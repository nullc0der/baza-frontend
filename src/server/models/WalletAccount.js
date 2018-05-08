// import _ from 'lodash'
// import Joi from 'joi'
// import Felicity from 'felicity'
// import faker from 'faker'

// // Schema for validation
// export const WalletAccountSchema = Joi.object().keys({
//   id: Joi.string()
//     .uuid()
//     .required(),
//   name: Joi.string()
//     .alphanum()
//     .valid('Monero', 'Baza', 'Bitcoin', 'Ether')
//     .required(),
//   image: Joi.string().required()
// })

// // Sample Data Generator
// export const WalletAccountGenerator = Felicity.entityFor(WalletAccountSchema)

// // Sample Data
// export const WalletAccounts = _.range(4).map(x => {
//   return {
//     ...WalletAccountGenerator.example(),
//     image: faker.image.avatar()
//   }
// })

export const WalletAccounts = [
  {
    id: 1,
    name: 'Baza',
    image: '/public/img/baza_logo.svg'
  },
  {
    id: 2,
    name: 'Monero',
    image: '/public/img/monero.svg'
  },
  {
    id: 3,
    name: 'Bitcoin',
    image: '/public/img/bitcoin.svg'
  },
  {
    id: 4,
    name: 'Ether',
    image: '/public/img/ethereum.svg'
  }
]
