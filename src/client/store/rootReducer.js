import { combineReducers } from 'redux'
import { routerReducer }   from 'react-router-redux'
import Runtime from './Runtime'

export default combineReducers({
    router: routerReducer,
    Runtime,
})
