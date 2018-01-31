import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import counter from './counter'
import cryptoApi from './cryptoApi'

export default combineReducers({
  router: routerReducer,
  counter,
  cryptoApi

})
