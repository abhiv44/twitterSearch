import { combineReducers } from 'redux'
import { twitterSearchReducer } from './userAuth'
export default combineReducers({
    twitterSearch: twitterSearchReducer
})