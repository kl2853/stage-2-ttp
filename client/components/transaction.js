import React from "react";

const toTimestamp = (isoTime) => {
    let converted = String(new Date(isoTime)).split(" ");
    let date = converted[1] + " " + converted[2] + " " + converted[3] + ", "
    let time = converted[4].split(":");
    time = (time[0] % 12) + ":" + time[1] + ":" + time[2] + " " + (time[0] >= 12 ? "PM" : "AM");
    return (date + time);
}

const Transaction = props => {
    const { ticker, historicPrice, quantity, action, createdAt } = props.transaction;
    return(
        <div className="transxndetails">
            <div className="histdetails">
                <div className="histaction">
                    {action}
                </div>
                <div className="histsymbol">
                    {ticker}
                </div>
                <div className="histqty">
                    {quantity}
                </div>
                <div className="histatsymbol">
                    @
                </div>
                <div className="histprice">
                    ${+historicPrice/100}
                </div>
            </div>
            <div className="transxntime">
                {toTimestamp(createdAt)}
            </div>
        </div>
    )
}

export default Transaction;
