import React from "react";
import { connect } from "react-redux";
import { getPortfolioThunk } from "../store";
import HoldingsList from "./holdingslist";

class Portfolio extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getPortfolio(this.props.userId);

    }

    render() {
        let tickerList;
        if(!!this.props.owned) {
            tickerList = this.props.owned.map(share => share.ticker).join(",");
        }

        return(
            <div>
                {(!!this.props.owned && this.props.owned.length && tickerList.length)
                    ?  <HoldingsList holdings={this.props.owned} tickerList={tickerList} />
                    : `No holdings to display.`
                    }
            </div>
        )
    }
}

const mapState = state => {
    return {
        owned: state.transactionState.owned,
        userId: state.userState.id
    }
}

const mapDispatch = dispatch => {
    return {
        getPortfolio(id) {
            dispatch(getPortfolioThunk(id));
        }
    }
}

export default connect(mapState, mapDispatch)(Portfolio);
