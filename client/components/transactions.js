import React from "react";
import { connect } from "react-redux";
import { getTransactionHistoryThunk } from "../store";
import Transaction from "./transaction";

class Transactions extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getHistory(this.props.userId);
    }

    render() {
        return(
            <div>
                {(!!this.props.transactionHistory)
                    ? this.props.transactionHistory.map(transaction => 
                    <div key={transaction.id}>
                        <Transaction transaction={transaction} />
                    </div>
                    )
                    : `No transactions to display.`}
            </div>
        )
    }
}

const mapState = state => {
    return {
        transactionHistory: state.transactionState.history,
        userId: state.userState.id
    }
}

const mapDispatch = dispatch => {
    return {
        getHistory(id) {
            dispatch(getTransactionHistoryThunk(id));
        }
    }
}

export default connect(mapState, mapDispatch)(Transactions);
