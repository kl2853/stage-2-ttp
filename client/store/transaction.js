import axios from "axios";

// action types
const BUY_SHARES = "BUY_SHARES";
const GET_TRANSACTION_HISTORY = "GET_TRANSACTION_HISTORY";

// action creators
const buyShares = shares => ({ type: BUY_SHARES, shares });
const getTransactionHistory = history => ({ type: GET_TRANSACTION_HISTORY, history });

// thunk creators
export const buySharesThunk = (id, shares) => async dispatch => {
    try {
        const { data } = await axios.post(`/api/transactions/${id}`, shares);
        console.log(data);
    } catch (err) {
        console.error(err);
    }
}

export const getTransactionHistoryThunk = (id) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/transactions/${id}`);
        dispatch(getTransactionHistory({ history: data }));
    } catch (err) {
        console.error(err);
    }
}

// initial state
const defaultTransaction = {};

// reducer
export default function(state = defaultTransaction, action) {
    switch(action.type) {
        case BUY_SHARES:
            return action.shares
        case GET_TRANSACTION_HISTORY:
            return action.history
        default:
            return state
    }
}
