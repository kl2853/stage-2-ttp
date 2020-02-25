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
        const res = await axios.get(/* holdings owned by user */);
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
}

export const addHoldingThunk = (holding, id) => async dispatch => {
    try {
        const res = await axios.post(/* add holding to user's portfolio */);
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}

// initial state
const stockHoldings = [];

// reducer
export default function(state = stockHoldings, action) {
    switch(action.type) {
        case GET_HOLDINGS:
            return action.holdings;
        case ADD_HOLDING:
            return action.holding;
        default:
            return state
    }
}
