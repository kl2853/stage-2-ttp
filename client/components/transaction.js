import React from "react";

const Transaction = props => {
    const { ticker, historicPrice, quantity, action } = props.transaction;

    return(
        <div>
            {action} {ticker}, {quantity} @ ${+historicPrice/100}
            <br />
            <hr />
        </div>
    )
}

export default Transaction;
