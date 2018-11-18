import { getActivityLog } from 'models/ActivityLog'

export function getAll(req, res, next) {
    res.json({
        status: 'success',
        statusCode: 200,
        results: getActivityLog()
    })
}
