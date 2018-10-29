import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { reducer as tooltip } from 'redux-tooltip'

import Auth from './Auth'

import Chat from './Chat'
import Common from './Common'
import Groups from './Groups'
import Members from './Members'
import Runtime from './Runtime'

import WalletAccounts from './WalletAccounts'
import WalletTransanctions from './WalletTransanctions'
import DistributionSignUp from './DistributionSignUp'

export default combineReducers({
    router,
    Runtime,

    Auth,

    Chat,
    Common,
    Groups,
    Members,

    WalletAccounts,
    WalletTransanctions,
    DistributionSignUp,

    tooltip
})
