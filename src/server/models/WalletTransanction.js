import Joi from 'joi'

const WalletTransanctionSchema = Joi.object().keys({
  // Keep a separate uuid id for internal purposes
  // TransactionID though unique is long should not be exposed directly in urls
  id: Joi.string()
    .uuid()
    .required(),
  transanctionId: Joi.string()
    .token()
    .required(),
  from: Joi.object().keys({
    walletId: Joi.number()
      .positive()
      .required(),
    userId: Joi.string().required(),
    fullName: Joi.string().required()
  }),
  to: Joi.object().keys({
    walletId: Joi.number()
      .positive()
      .required(),
    userId: Joi.string().required(),
    fullName: Joi.string().required()
  }),
  description: Joi.string().required(),
  status: Joi.string()
    .valid('pending', 'executed', 'cancelled')
    .required()
})

export default WalletTransanctionSchema
