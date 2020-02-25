import axios from "axios";
import { IEX_PUBLIC_KEY, IEX_SECRET_KEY } from "../../keys";
 
// base url and current version of api
const baseUrl = "https://sandbox.iexapis.com/stable";

// action types
const GET_PRICE = "GET_PRICE";

// action creators
const getPrice = price => ({ type: GET_PRICE, price });

// thunk creators
export const getPriceThunk = (ticker) => async dispatch => {
    let res;
    try {
        res = await axios.get(`${baseUrl}/stock/${ticker}/quote?token=${IEX_PUBLIC_KEY}`);
    } catch (fetchErr) {
        return dispatch(getPrice({ error: fetchErr }));
    }

    try {
        dispatch(getPrice({ price: res.data.latestPrice }));
    } catch (err) {
        console.error(err);
    }
}

// initial state
const defaultIex = {}

// reducer
export default function(state = defaultIex, action) {
    switch(action.type) {
        case GET_PRICE:
            return action.price
        default:
            return state
    }
}
