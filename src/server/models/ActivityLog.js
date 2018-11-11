import _ from 'lodash'
import Joi from 'joi'
import Felicity from 'felicity'
import faker from 'faker'

// Schema for validation
export const ActivityLogSchema = Joi.object().keys({
    id: Joi.number().integer().positive().required(),
    description: Joi.string().min(40).max(80).required(),
    timestamp: Joi.date().timestamp().required()
})

// Sample Data Generator
export const ActivityLogGenerator = Felicity.entityFor(ActivityLogSchema)

// Sample Data
export const getActivityLog = () =>
    _.chain()
        .range(10)
        .map(x => {
            const item = ActivityLogGenerator.example()
            item.id = x
            item.description = faker.lorem.sentence()
            return item
        })
        .sortBy('id')
        .value()
