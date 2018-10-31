import { Donations } from 'models/Donation'

export function getAll(req, res, next) {
    res.json({
        status: 'success',
        statusCode: 200,
        results: Donations
    })
}
