import axios from "axios";

// action types
const GET_PORTFOLIO = "GET_PORTFOLIO";
const MAKE_PURCHASE = "MAKE_PURCHASE";
const GET_TRANSACTION_HISTORY = "GET_TRANSACTION_HISTORY";
const INSUFFICIENT_FUNDS = "INSUFFICIENT_FUNDS";
const CLEAR_WARNING = "CLEAR_WARNING";
const CLEAR_TRANSACTION = "CLEAR_TRANSACTION";

// action creators
const getPortfolio = owned => ({ type: GET_PORTFOLIO, owned });
const makePurchase = purchase => ({ type: MAKE_PURCHASE, purchase });
const getTransactionHistory = history => ({ type: GET_TRANSACTION_HISTORY, history });
export const insufficientFunds = () => ({ type: INSUFFICIENT_FUNDS });
export const clearWarning = () => ({ type: CLEAR_WARNING });
export const clearTransaction = () => ({ type: CLEAR_TRANSACTION });

// thunk creators
export const getPortfolioThunk = (id) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/transactions/${id}/owned`);
        dispatch(getPortfolio(data));
    } catch (err) {
        console.error(err);
    }
}

export const makePurchaseThunk = (id, ticker, historicPrice, quantity, action) => async dispatch => {
    try {
        const { data } = await axios.post(`/api/transactions/${id}/buy`, { ticker, historicPrice, quantity, action });
        dispatch(makePurchase({ ticker: data.transaction.ticker, quantity: data.numShares }));
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
    owned: [],
    error: {}
};

// reducer
export default function(state = defaultTransaction, action) {
    switch(action.type) {
        case MAKE_PURCHASE:
            const ticker = action.purchase.ticker
            let added = state.owned;
            let idx = state.owned.findIndex(share => share.ticker === ticker)
            if(idx !== -1) added[idx] = action.purchase;
            else added = [...added, action.purchase];
            return {...state, owned: [...added]}
        case GET_TRANSACTION_HISTORY:
            return {...state, history: action.history}
        case GET_PORTFOLIO:
            return {...state, owned: action.owned}
        case INSUFFICIENT_FUNDS:
            const err = {}
            err["response"] = "Insufficient funds"
            return {...state, error: err}
        case CLEAR_WARNING:
            return {...state, error: {}}
        case CLEAR_TRANSACTION:
            return defaultTransaction
        default:
            return state
    }
}
