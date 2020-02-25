import React from "react";
import { connect } from "react-redux";
import { getHoldingsThunk } from "../store";
import HoldingsList from "./holdingslist";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getHoldings(this.props.userId);

    }

    render() {
        let tickerList;
        if(!!this.props.holdings) {
            tickerList = this.props.holdings.map(holding => holding.ticker).join(",");
        }

        return(
            <div>
                {(!!this.props.holdings && this.props.holdings.length && tickerList.length)
                    ?  <HoldingsList holdings={this.props.holdings} tickerList={tickerList} />
                    : `No holdings to display.`
                    }
            </div>
        )
    }
}

const mapState = state => {
    return {
        holdings: state.holdingState.holdings,
        userId: state.userState.id
    }
}

const mapDispatch = dispatch => {
    return {
        getHoldings(id) {
            dispatch(getHoldingsThunk(id));
        }
    }
}

export default connect(mapState, mapDispatch)(Portfolio);
