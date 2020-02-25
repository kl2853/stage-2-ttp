import axios from "axios";

// action types
const MAKE_PURCHASE = "MAKE_PURCHASE";
const GET_TRANSACTION_HISTORY = "GET_TRANSACTION_HISTORY";
const INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS";
const CLEAR_WARNING = "CLEAR_WARNING";

// action creators
const makePurchase = purchase => ({ type: MAKE_PURCHASE, purchase });
const getTransactionHistory = history => ({ type: GET_TRANSACTION_HISTORY, history });
export const insufficientFunds = () => ({ type: INSUFFICIENT_FUNDS });
export const clearWarning = () => ({ type: CLEAR_WARNING });

// thunk creators
export const makePurchaseThunk = (id, ticker, historicPrice, quantity, action) => async dispatch => {
    try {
        const { data } = await axios.post(`/api/transactions/${id}`, { ticker, historicPrice, quantity, action });
        dispatch(makePurchase(data));
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
    lastPurchase: {},
    error: {}
};

// reducer
export default function(state = defaultTransaction, action) {
    switch(action.type) {
        case MAKE_PURCHASE:
            return {...state, lastPurchase: action.purchase};
        case GET_TRANSACTION_HISTORY:
            return {...state, history: action.history}
        case INSUFFICIENT_FUNDS:
            const err = {};
            err["response"] = "Insufficient funds";
            return {...state, error: err};
        case CLEAR_WARNING:
            return {...state, error: {}};
        default:
            return state
    }
}
