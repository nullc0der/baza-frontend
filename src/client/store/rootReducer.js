import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import Auth from './Auth'

import Chat from './Chat'
import Common from './Common'
import Groups from './Groups'
import Members from './Members'
import UserProfile from './UserProfile'

import WalletAccounts from './WalletAccounts'
import WalletTransanctions from './WalletTransanctions'
import DistributionSignUp from './DistributionSignUp'

export default combineReducers({
    router,
    UserProfile,

    Auth,

    Chat,
    Common,
    Groups,
    Members,

    WalletAccounts,
    WalletTransanctions,
    DistributionSignUp
})
