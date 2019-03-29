import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import Auth from './Auth'

import Common from './Common'
import Group from './Group'
import GroupPosts from './GroupPosts'
import GroupNews from './GroupNews'
import GroupFaqs from './GroupFaqs'
import Members from './Members'
import UserProfile from './UserProfile'

import WalletAccounts from './WalletAccounts'
import WalletTransanctions from './WalletTransanctions'
import DistributionSignUp from './DistributionSignUp'
import Users from './Users'

import Messenger from './Messenger'

import Notifications from './Notifications'
import Donations from './Donations'
import HashTag from './HashTag'

import Landing from './Landing'

export default combineReducers({
    router,
    UserProfile,
    Auth,
    Common,
    Group,
    GroupPosts,
    GroupNews,
    GroupFaqs,
    Members,
    WalletAccounts,
    WalletTransanctions,
    DistributionSignUp,
    Users,
    Messenger,
    Notifications,
    Donations,
    HashTag,
    Landing
})
