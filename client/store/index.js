import { createStore, combineReducers, applyMiddleware } from "redux";
import thunkMiddleware from "redux-thunk";
import user from "./user";
import iex from "./iex";
import transaction from "./transaction";

const reducer = combineReducers({ 
    userState: user,
    iexState: iex,
    transactionState: transaction
});

const middleware = applyMiddleware(thunkMiddleware)

const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./iex";
export * from "./transaction";
