import axios from "axios";

// action types
const GET_HOLDINGS = "GET_HOLDINGS";
const ADD_HOLDING = "ADD_HOLDING";

// action creators
const getHoldings = holdings => ({ type: GET_HOLDINGS, holdings });
const addHolding = holding => ({ type: ADD_HOLDING, holding });

// thunk creators
export const getHoldingsThunk = (id) => async dispatch => {
    try {
        const { data } = await axios.get(`/api/holdings/${id}`);
        dispatch(getHoldings(data));
    } catch (err) {
        console.error(err);
    }
}

export const addHoldingThunk = (id, ticker, qty) => async dispatch => {
    try {
        const { data } = await axios.put(`/api/holdings/${id}/${ticker}/buy`, qty);
        dispatch(addHolding(data));
    } catch (err) {
        console.error(err);
    }
}

// initial state
const stockHoldings = {
    holdings: []
};

// reducer
export default function(state = stockHoldings, action) {
    switch(action.type) {
        case GET_HOLDINGS:
            return {...state, holdings: action.holdings}
        case ADD_HOLDING:
            const ticker = action.holding.ticker;
            const added = state.holdings.filter(holding => holding.ticker !== ticker);
            return {...state, holdings: [...added, action.holding]};
        default:
            return state
    }
}
