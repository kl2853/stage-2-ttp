import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./user";
import iex from "./iex";
import transaction from "./transaction";

const reducer = combineReducers({ 
    userState: user,
    iexState: iex,
    transactionState: transaction
});

const middleware = composeWithDevTools(
    applyMiddleware(thunkMiddleware, createLogger({ collapsed : true }))
);

const store = createStore(reducer, middleware);

export default store;
export * from "./user";
export * from "./iex";
export * from "./transaction";
