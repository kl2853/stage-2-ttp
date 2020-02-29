import axios from "axios"
import { IEX_PUBLIC_KEY, IEX_SECRET_KEY } from "../../keys"
 
// base url and current version of api
const baseUrl = "https://cloud.iexapis.com/stable"

// action types
const GET_QUERY = "GET_QUERY"
const GET_BATCH_PRICES = "GET_BATCH_PRICES"
const APPEND_PURCHASE = "APPEND_PURCHASE"
const GET_ERROR = "GET_ERROR"
const CLEAR_QUERY = "CLEAR_QUERY"
const CLEAR_ERROR = "CLEAR_ERROR"
const CLEAR_IEX = "CLEAR_IEX"

// action creators
const getQuery = query => ({ type: GET_QUERY, query })
const getBatchPrices = prices => ({ type: GET_BATCH_PRICES, prices })
const getError = error => ({ type: GET_ERROR, error })
export const appendPurchase = price => ({ type: APPEND_PURCHASE, price })
export const clearQuery = () => ({ type: CLEAR_QUERY })
export const clearError = () => ({ type: CLEAR_ERROR })
export const clearIex = () => ({ type: CLEAR_IEX })

// thunk creators
export const getQueryThunk = (ticker) => async dispatch => {
    let res
    try {
        res = await axios.get(`${baseUrl}/stock/${ticker}/quote?token=${IEX_PUBLIC_KEY}`)
    } catch (fetchErr) {
        return dispatch(getError(fetchErr))
    }

    try {
        dispatch(getQuery(res.data))
    } catch (err) {
        console.error(err)
    }
}

export const getBatchPricesThunk = (tickers) => async dispatch => {
    let res
    try {
        res = await axios.get(`${baseUrl}/stock/market/batch?symbols=${tickers}&types=quote&token=${IEX_PUBLIC_KEY}`)
    } catch (fetchErr) {
        return dispatch(getError(fetchErr))
    }

    try {
        dispatch(getBatchPrices(res.data))
    } catch (err) {
        console.error(err)
    }
}

// initial state
const defaultIex = {
    query: {},
    prices: {},
    error: {}
}

// reducer
export default function(state = defaultIex, action) {
    switch(action.type) {
        case GET_QUERY:
            return {...state, query: action.query}
        case GET_BATCH_PRICES:
            return {...state, prices: action.prices}
        case GET_ERROR:
            return {...state, error: action.error}
        case APPEND_PURCHASE:
            state.prices[action.price.symbol] = { quote: action.price }
            return {...state, prices: state.prices}
        case CLEAR_QUERY:
            return {...state, query: defaultIex.query}
        case CLEAR_ERROR:
            return {...state, error: defaultIex.error}
        case CLEAR_IEX:
            return defaultIex
        default:
            return state
    }
}
