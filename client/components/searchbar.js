import React from "react";
import { connect } from "react-redux";
import { getPriceThunk } from "../store";

const SearchBar = props => {
    const { latestPrice, handleChange, error } = props;

    return(
        <div>
            <input name="ticker" onChange={handleChange} placeholder="Search by ticker symbol" />
            <div>
                {(!!latestPrice) && <div> 
                    <div>
                        Current price: {latestPrice}
                    </div>
                    <div>
                        <button type="button">Buy</button>
                    </div>
                    </div>}
                {error && error.response && <div> {error.response.data} </div>}
            </div>
        </div>
    )
}

const mapState = state => {
    return {
        latestPrice: state.iexState.price,
        error: state.iexState.error
    }
}

const mapDispatch = dispatch => {
    return {
        handleChange(evt) {
            let ticker = evt.target.value;
            if(!!ticker.length) dispatch(getPriceThunk(ticker));
        }
    }
}

export default connect(mapState, mapDispatch)(SearchBar);
