import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import Auth from './Auth'

import Common from './Common'
import Group from './Group'
import GroupPosts from './GroupPosts'
import Members from './Members'
import UserProfile from './UserProfile'

import WalletAccounts from './WalletAccounts'
import WalletTransanctions from './WalletTransanctions'
import DistributionSignUp from './DistributionSignUp'
import Users from './Users'

import Messenger from './Messenger'

import Notifications from './Notifications'

export default combineReducers({
    router,
    UserProfile,
    Auth,
    Common,
    Group,
    GroupPosts,
    Members,
    WalletAccounts,
    WalletTransanctions,
    DistributionSignUp,
    Users,
    Messenger,
    Notifications
})
