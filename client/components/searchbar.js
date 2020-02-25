import React from "react";
import { connect } from "react-redux";
import { getPriceThunk, addHoldingThunk, buySharesThunk, clearPrice, clearError } from "../store";

const SearchBar = props => {
    const { latestPrice, handleChange, handleSubmit, user, error } = props;

    return(
        <div>
            <form onSubmit={handleSubmit(user)(latestPrice)}>
                <input name="ticker" onChange={handleChange} placeholder="Search by ticker symbol" />
                <div>
                    {(!!latestPrice) && <div> 
                        <div>
                            Current price: ${latestPrice}
                        </div>
                            Quantity: <input name="quantity" type="number" step="1" min="1" required/>
                        <div>
                            <button type="submit" disabled={!!error.response}>Buy</button>
                        </div>
                        </div>}
                    {error && error.response && <div> {error.response.data} </div>}
                </div>
            </form>
        </div>
    )
}

const mapState = state => {
    return {
        latestPrice: state.iexState.price,
        error: state.iexState.error,
        user: state.userState
    }
}

const mapDispatch = dispatch => {
    return {
        handleChange(evt) {
            let ticker = evt.target.value;
            dispatch(clearError());
            if(!!ticker.length) {
                dispatch(getPriceThunk(ticker));
            } else {
                dispatch(clearPrice());
            }
        },
        handleSubmit: user => price => evt => {
            evt.preventDefault();
            let ticker = evt.target.ticker.value.toUpperCase();
            let quantity = (+evt.target.quantity.value);
            let action = "BUY";
            price = price * 100; // convert to integer for db, conversion not as lossy
            let totalPrice = quantity * price;
            if(totalPrice > userBalance) {
                
            } else {
                dispatch(buySharesThunk(user.id, ticker, price, quantity, action));
                dispatch(addHoldingThunk(user.id, ticker, { quantity }));
            }
        }
    }
}

export default connect(mapState, mapDispatch)(SearchBar);
