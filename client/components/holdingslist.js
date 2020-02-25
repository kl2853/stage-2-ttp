import React from "react";
import { connect } from "react-redux";
import { getBatchPricesThunk } from "../store";
import Holding from "./holding";

class HoldingsList extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPrices(this.props.tickerList);
    }

    render() {
        let { prices, holdings } = this.props;
        let mapped;
        if(!!prices && !!holdings) {
            mapped = Object.values(prices).reduce((acc, val) => {
                acc[val.quote.symbol] = val.quote.latestPrice;
                return acc;
            }, {});
        }

        return(
            <div>
                {(!!holdings && holdings.length && !!prices)
                    ? holdings.map(holding =>
                        <Holding key={holding.ticker} holding={holding} latestPrice={mapped[holding.ticker]} />)
                    : `No holdings to display.`}
            </div>
        )
    }
}

const mapState = state => {
    return {
        prices: state.iexState.prices
    }
}

const mapDispatch = dispatch => {
    return {
        getPrices(tickers) {
            dispatch(getBatchPricesThunk(tickers));
        }
    }
}

export default connect(mapState, mapDispatch)(HoldingsList);
