import React from "react";

const Transaction = props => {
    const { ticker, companyName, historicPrice, quantity, action } = props.transaction;

    return(
        <div>
            {action} {ticker}, {quantity} @ ${+historicPrice/100}
            <br />
            <small>{companyName}</small>
            <hr />
        </div>
    )
}

export default Transaction;
