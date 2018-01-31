import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import cryptoApi from './cryptoApi'
import userSettings from './userSettings'

export default combineReducers({
  router: routerReducer,
  counter,
  cryptoApi,
  userSettings

})
