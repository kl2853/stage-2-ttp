import axios from "axios";
import { IEX_PUBLIC_KEY, IEX_SECRET_KEY } from "../../keys";
 
// base url and current version of api
const baseUrl = "https://cloud.iexapis.com/stable";

// action types
const GET_PRICE = "GET_PRICE";
const GET_BATCH_PRICES = "GET_BATCH_PRICES";
const GET_BATCH_OPEN = "GET_BATCH_OPEN";
const GET_ERROR = "GET_ERROR";
const CLEAR_PRICE = "CLEAR_PRICE";
const CLEAR_ERROR = "CLEAR_ERROR";

// action creators
const getPrice = price => ({ type: GET_PRICE, price });
const getBatchPrices = prices => ({ type: GET_BATCH_PRICES, prices });
const getBatchOpen = openPrices => ({ type: GET_BATCH_OPEN, openPrices });
const getError = error => ({ type: GET_ERROR, error });
export const clearPrice = () => ({ type: CLEAR_PRICE });
export const clearError = () => ({ type: CLEAR_ERROR });

// thunk creators
export const getPriceThunk = (ticker) => async dispatch => {
    let res;
    try {
        res = await axios.get(`${baseUrl}/stock/${ticker}/quote/latestPrice?token=${IEX_PUBLIC_KEY}`);
    } catch (fetchErr) {
        return dispatch(getError(fetchErr));
    }

    try {
        dispatch(getPrice(res.data));
    } catch (err) {
        console.error(err);
    }
}

export const getBatchPricesThunk = (tickers) => async dispatch => {
    let res;
    try {
        res = await axios.get(`${baseUrl}/stock/market/batch?symbols=${tickers}&types=quote&token=${IEX_PUBLIC_KEY}`);
    } catch (fetchErr) {
        return dispatch(getError(fetchErr));
    }

    try {
        dispatch(getBatchPrices(res.data));
    } catch (err) {
        console.error(err);
    }
}

export const getBatchOpenThunk = () => async dispatch => {
    let res;
    try {
        res = await axios.get(`${baseUrl}/deep/official-price?symbols=IBM,TSLA&token=${IEX_PUBLIC_KEY}`);
        console.log(res);
    } catch (fetchErr) {
        return dispatch(getError(fetchErr));
    }

    try {
        dispatch(getBatchPrices(res.data));
    } catch (err) {
        console.error(err);
    }
}

// initial state
const defaultIex = {
    price: 0,
    prices: {},
    error: {}
}

// reducer
export default function(state = defaultIex, action) {
    switch(action.type) {
        case GET_PRICE:
            return {...state, price: action.price}
        case GET_BATCH_PRICES:
            return {...state, prices: action.prices}
        case GET_ERROR:
            return {...state, error: action.error}
        case CLEAR_PRICE:
            return {...state, price: 0}
        case CLEAR_ERROR:
            return {...state, error: {}}
        default:
            return state
    }
}
