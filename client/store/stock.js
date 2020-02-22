import axios from "axios";

// action types
const GET_STOCKS = "GET_STOCKS";
const ADD_STOCK = "ADD_STOCK";

// action creators
const getStocks = stocks => ({ type: GET_STOCK, stocks });
const addStock = stock => ({ type: ADD_STOCK, stock });

// thunk creators
export const getStocksThunk = (id) => async dispatch => {
    try {
        const res = await axios.get(/* stocks belonging to user */);
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
}

export const addStockThunk = (stock, id) => async dispatch => {
    try {
        const res = await axios.post(/* add stock to user with id */);
        console.log(res);
    } catch (err) {
        console.error(err);
    }
}

// initial state
const defaultStockList = [];

// reducer
export default function(state = defaultStockList, action) {
    switch(action.type) {
        case GET_STOCKS:
            return action.stocks;
        case ADD_STOCK:
            return action.stock;
        default:
            return state
    }
}
