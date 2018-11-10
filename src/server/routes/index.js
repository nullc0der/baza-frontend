import { Router } from 'express'
import MockAPI from '../mock'
const router = Router()

/**
 * [StaticRenderer description]
 * @param {Object} [options={}] [description]
 * @returns {ExpressMiddleware} middleware is a function with req, res, next arguments.
 */
/*eslint-disable*/
const StaticRenderer = (req, res, next) => {
    return res.render('index', {})
}
/*eslint-enable*/

/**
 * [getRouter Returns main router for application]
 * @param  {object} app     [express.js app object]
 * @return {object} router  [express.js router with bound routes]
 */
export default function getRouter(app) {
    // Health check
    router.get('/ping', (req, res) => res.status(200).send('pong'))

    router.use('/api/v1/mock', MockAPI)

    // No server rendering
    router.get('*', StaticRenderer)

    // Server rendering
    // router.get(
    //     '*',
    //     require('../helpers/pre-renderer').default
    // )

    return router
}
