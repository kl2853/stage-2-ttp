import axios from "axios";
import history from "../history";

// action types
const GET_USER = "GET_USER";
const REMOVE_USER = "REMOVE_USER";
const UPDATE_BALANCE = "UPDATE_BALANCE";

// action creators
const getUser = user => ({ type: GET_USER, user });
const removeUser = () => ({ type: REMOVE_USER });
const updateBalance = user => ({ type: UPDATE_BALANCE, user });

// thunk creators
export const auth = (name, email, password, method) => async dispatch => {
    let res;
    try {
        if(method === "signup") res = await axios.post(`/auth/${method}`, { name, email, password });
        else res = await axios.post(`/auth/${method}`, { email, password });
    } catch (authErr) {
        return dispatch(getUser({ error: authErr }));
    }

    try {
        dispatch(getUser(res.data));
        history.push("/myportfolio");
    } catch (dispatchOrHistoryErr) {
        console.error(dispatchOrHistoryErr);
    }
}

export const me = () => async dispatch => {
    try {
        const { data } = await axios.get("/auth/me");
        dispatch(getUser(data || defaultUser));
    } catch (err) {
        console.error(err);
    }
}

export const logout = () => async dispatch => {
    try {
        await axios.post("/auth/logout");
        dispatch(removeUser());
        history.push("/login");
    } catch (err) {
        console.error(err);
    }
}

export const updateBalanceThunk = (id, totalPrice) => async dispatch => {
    try {
        const { data } = await axios.put(`/api/users/${id}/buy`, { totalPrice });
        dispatch(updateBalance(data));
    } catch (err) {
        console.error(err);
    }
}

// initial state
const defaultUser = {
    user: {}
};

// reducer
export default function(state = defaultUser, action) {
    switch(action.type) {
        case GET_USER:
            return action.user
        case REMOVE_USER:
            return defaultUser
        case UPDATE_BALANCE:
            return action.user
        default:
            return state
    }
}
