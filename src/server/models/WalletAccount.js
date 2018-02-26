import Joi from 'joi'

const WalletAccountSchema = Joi.object().keys({
  id: Joi.number()
    .positive()
    .required(),
  name: Joi.string()
    .alphanum()
    .required()
})

export default WalletAccountSchema
