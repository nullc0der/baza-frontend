import _ from 'lodash'
import Joi from 'joi'
import Felicity from 'felicity'
// import faker from 'faker'

// Schema for validation
export const DonationSchema = Joi.object().keys({
    iso: Joi.string()
        .alphanum()
        .valid('USA', 'IND', 'DEU', 'BRA', 'CHN', 'ARG', 'AUS')
        .required(),
    totalRecepients: Joi.number()
        .min(200)
        .max(3000)
        .integer()
        .required(),
    totalDonors: Joi.number()
        .min(50)
        .max(500)
        .integer()
        .required()
})

// Sample Data Generator
export const DonationGenerator = Felicity.entityFor(DonationSchema)

// Sample Data
export const getDonations = () =>
    _.chain()
        .range(10)
        .map(x => ({
            ...DonationGenerator.example()
        }))
        .uniqBy('iso')
        .value()
