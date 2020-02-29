import React from "react"
import { connect } from "react-redux"
import { getQueryThunk, makePurchaseThunk, updateBalanceThunk, appendPurchase, insufficientFunds, clearQuery, clearError, clearWarning } from "../store"
import debounce from "lodash/debounce"

export const showCents = balance => {
    balance = String(balance)
   if(balance.slice(balance.length - 2) === "00") return ".00"
   else return null
}

const SearchBar = props => {
    const { query, handleChange, handleQty, handleSubmit, user, fetchErr, transactionErr } = props
    const inDollars = user.accountBalance/100

    return(
        <div id="purchase">
            <div>
                Account Balance: ${inDollars}{showCents(inDollars)}
            </div>
            <div id="searchwidget">
                <form onSubmit={handleSubmit(user)(query)}>
                    <input name="ticker" onChange={handleChange} placeholder="Search by ticker symbol" />
                    <div id="results">
                        {(!!query.symbol) && <div className="query"> 
                            <div id="qprice">
                                Current price: ${query.latestPrice}
                            </div >
                            <div id="purchaseqty">
                                Quantity: <input name="quantity" onChange={handleQty(user)(query)} type="number" step="1" min="1" required/>
                            </div>
                            <div id="purchasebtn">
                                <button type="submit" disabled={!!fetchErr.response || !!transactionErr.response}>Buy</button>
                            </div>
                            </div>}
                        {fetchErr && fetchErr.response && <div className="error"> {fetchErr.response.data} </div>}
                        {transactionErr && transactionErr.response && <div className="error"> {transactionErr.response} </div>}
                    </div>
                </form>
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        query: state.iexState.query,
        user: state.userState,
        fetchErr: state.iexState.error,
        transactionErr: state.transactionState.error
    }
}

// real time search debounced so that it doesn't fire continuously
const debouncedDispatch = debounce(function (evt, dispatch) {
    let ticker = evt.target.value
    dispatch(clearWarning())
    if(!!ticker.length) {
        dispatch(clearError())
        dispatch(getQueryThunk(ticker))
    } else {
        dispatch(clearError())
        dispatch(clearQuery())
    }
}, 400) // only checks every 400 milliseconds for changes

const mapDispatch = dispatch => {
    return {
        handleChange(evt) {
            // synthetic events in react don't persist after firing unless explicitly stated
            evt.persist()
            debouncedDispatch(evt, dispatch)
        },
        handleQty: user => query => evt => {
            let quantity = (+evt.target.value) // string -> number
            let price = Math.round(query.latestPrice * 100) // convert to integer for db, conversion not as lossy, rounding to get prices to 2 decimal places max
            let totalPrice = quantity * price
            if(totalPrice > user.accountBalance) {
                dispatch(insufficientFunds())
            } else {
                dispatch(clearWarning())
            }
        },
        handleSubmit: user => query => evt => {
            evt.preventDefault()
            let ticker = evt.target.ticker.value.toUpperCase() // consistent casing
            let quantity = (+evt.target.quantity.value)
            let action = "BUY"
            let price = Math.round(query.latestPrice * 100)
            let totalPrice = quantity * price
            if(totalPrice > user.accountBalance) {
                dispatch(insufficientFunds())
            } else if(!!ticker.length) { // in case user selects all and deletes input value
                dispatch(makePurchaseThunk(user.id, ticker, price, quantity, action))
                dispatch(updateBalanceThunk(user.id, price, quantity))
                dispatch(appendPurchase(query))
            }
        }
    }
}

export default connect(mapState, mapDispatch)(SearchBar)
