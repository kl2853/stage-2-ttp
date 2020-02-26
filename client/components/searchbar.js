import React from "react";
import { connect } from "react-redux";
import { getPriceThunk, makePurchaseThunk, updateBalanceThunk, insufficientFunds, clearPrice, clearError, clearWarning } from "../store";
import debounce from "lodash/debounce";

const SearchBar = props => {
    const { latestPrice, handleChange, handleSubmit, user, fetchErr, transactionErr } = props;

    return(
        <div>
            <div>
                Account Balance: ${user.accountBalance/100}
            </div>
            <form onSubmit={handleSubmit(user)(latestPrice)}>
                <input name="ticker" onChange={handleChange} placeholder="Search by ticker symbol" />
                <div>
                    {(!!latestPrice) && <div> 
                        <div>
                            Current price: ${latestPrice}
                        </div>
                            Quantity: <input name="quantity" type="number" step="1" min="1" required/>
                        <div>
                            <button type="submit" disabled={!!fetchErr.response}>Buy</button>
                        </div>
                        </div>}
                    {fetchErr && fetchErr.response && <div> {fetchErr.response.data} </div>}
                    {transactionErr && transactionErr.response && <div> {transactionErr.response} </div>}
                </div>
            </form>
        </div>
    )
}

const mapState = state => {
    return {
        latestPrice: state.iexState.price,
        user: state.userState,
        fetchErr: state.iexState.error,
        transactionErr: state.transactionState.error
    }
}

// real time search debounced so that it doesn't fire continuously
const debouncedDispatch = debounce(function (evt, dispatch) {
    let ticker = evt.target.value;
    dispatch(clearWarning());
    if(!!ticker.length) {
        dispatch(clearError());
        dispatch(getPriceThunk(ticker));
    } else {
        dispatch(clearError());
        dispatch(clearPrice());
    }
}, 400); // only checks every 400 milliseconds for changes

const mapDispatch = dispatch => {
    return {
        handleChange(evt) {
            // synthetic events in react don't persist after firing unless explicitly stated
            evt.persist();
            debouncedDispatch(evt, dispatch);
        },
        handleSubmit: user => price => evt => {
            evt.preventDefault();
            let ticker = evt.target.ticker.value.toUpperCase(); // consistent casing
            let quantity = (+evt.target.quantity.value); // string -> number
            let action = "BUY";
            price = price * 100; // convert to integer for db, conversion not as lossy
            let totalPrice = quantity * price;
            if(totalPrice > user.accountBalance) {
                dispatch(insufficientFunds());
            } else if(!!ticker.length) { // in case user selects all and deletes input value
                dispatch(makePurchaseThunk(user.id, ticker, price, quantity, action));
                dispatch(updateBalanceThunk(user.id, price, quantity));
            }
        }
    }
}

export default connect(mapState, mapDispatch)(SearchBar);
