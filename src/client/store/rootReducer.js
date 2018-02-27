import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'

import Chat from './Chat'
import Common from './Common'
import Groups from './Groups'
import Members from './Members'
import Runtime from './Runtime'

import WalletAccounts from './WalletAccounts'
import WalletTransanctions from './WalletTransanctions'

export default combineReducers({
  router,
  Runtime,

  Chat,
  Common,
  Groups,
  Members,

  WalletAccounts,
  WalletTransanctions
})
