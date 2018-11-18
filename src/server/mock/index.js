import { Router } from 'express'

import * as WalletAccountsController from './wallet-accounts'
import * as WalletTransanctionsController from './wallet-transanctions'
import * as DonationsController from './donations'
import * as ActivityLogController from './activity-log'

const router = Router()

router.get('/activity-log', ActivityLogController.getAll)
router.get('/donations', DonationsController.getAll)
router.get('/wallet-accounts', WalletAccountsController.getAll)
router.get('/wallet-transanctions', WalletTransanctionsController.getAll)

export default router
