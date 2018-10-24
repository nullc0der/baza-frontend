import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import Auth from './Auth'

import Common from './Common'
import Groups from './Groups'
import Members from './Members'
import UserProfile from './UserProfile'

import WalletAccounts from './WalletAccounts'
import WalletTransanctions from './WalletTransanctions'
import DistributionSignUp from './DistributionSignUp'
import Users from './Users'

import Messenger from './Messenger'

export default combineReducers({
    router,
    UserProfile,
    Auth,
    Common,
    Groups,
    Members,
    WalletAccounts,
    WalletTransanctions,
    DistributionSignUp,
    Users,
    Messenger
})
