import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import cryptoApi from './cryptoApi'
import userSettings from './userSettings'
import filter from './filter'

export default combineReducers({
  router: routerReducer,
  counter,
  cryptoApi,
  userSettings,
  filter

})
