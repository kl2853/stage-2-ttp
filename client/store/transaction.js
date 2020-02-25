import axios from "axios";
import { Portfolio } from "../components";

// action types
const BUY_SHARES = "BUY_SHARES";
const GET_TRANSACTION_HISTORY = "GET_TRANSACTION_HISTORY";

// action creators
const buyShares = shares => ({ type: BUY_SHARES, shares });
const getTransactionHistory = history => ({ type: GET_TRANSACTION_HISTORY, history });

// thunk creators
export const buySharesThunk = (id, ticker, historicPrice, quantity, action) => async dispatch => {
    try {
        const { data } = await axios.post(`/api/transactions/${id}`, { ticker, historicPrice, quantity, action });
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

export const getTransactionHistoryThunk = (id) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/transactions/${id}`);
        dispatch(getTransactionHistory(data));
    } catch (err) {
        console.error(err);
    }
}

// initial state
const defaultTransaction = {
    history: [],
    shares: {}
};

// reducer
export default function(state = defaultTransaction, action) {
    switch(action.type) {
        case BUY_SHARES:
            return {...state, shares: action.shares}
        case GET_TRANSACTION_HISTORY:
            return {...state, history: action.history}
        default:
            return state
    }
}
