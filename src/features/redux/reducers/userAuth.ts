import { LOADING, ERROR, DATA } from '../action/actionTypes/actionTypes'
import { UserAuth } from '../state/userAuth'
export function twitterSearchReducer(state: UserAuth, action) {
  switch (action.type) {
    case LOADING:
      return { ...state, loading: true }
    case DATA:
      return { ...state, data: (action.payload.statuses || []).slice(0, action.t).filter(e => action.search.searchFilter ? e.user.name.toLowerCase().includes(action.search.searchFilter) : e), loading: false }
    case ERROR:
      return { ...state, err: action.payload, loading: false }
    default:
      return { ...state }
  }
}