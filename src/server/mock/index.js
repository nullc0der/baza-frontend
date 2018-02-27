import { Router } from 'express'

import * as WalletAccountsController from './wallet-accounts'
import * as WalletTransanctionsController from './wallet-transanctions'

const router = Router()

router.get('/wallet-accounts', WalletAccountsController.getAll)
router.get('/wallet-transanctions', WalletTransanctionsController.getAll)

export default router
