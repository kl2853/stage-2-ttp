import axios from "axios";
import { IEX_PUBLIC_KEY, IEX_SECRET_KEY } from "../../keys";
 
// base url and current version of api
const baseUrl = "https://sandbox.iexapis.com/stable"

// action types
const GET_PRICE = "GET_PRICE";

// action creators
const getPrice = price => ({ type: GET_PRICE, price})

// thunk creators
export const getPriceThunk = (ticker) => async dispatch => {
    try {
        const res = await axios.get(`${baseUrl}/stock/${ticker}/quote?token=${IEX_PUBLIC_KEY}`);
        console.log(res.data);
    } catch (err) {
        console.error(err);
    }
}

// initial state
const defaultPrice = 0;

// reducer
export default function(state = defaultPrice, action) {
    switch(action.type) {
        case GET_PRICE:
            return action.price
        default:
            return state
    }
}
