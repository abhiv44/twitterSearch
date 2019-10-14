import { LOADING, ERROR, DATA } from './actionTypes/actionTypes'
import axios from 'axios'
const _url = 'https://aravindtwitter.herokuapp.com/twittersearch?key=adobe'
export const setLoading = () => {
    return {
        type: LOADING
    }
}
export const twitterAction = (e, t) => dispatch => {
    dispatch(setLoading())
    axios.get(_url)
        .then(res => dispatch({ type: DATA, payload: res.data, search: e, t: t })
        )
        .catch(err => dispatch({ type: ERROR, payload: err.response }))
}