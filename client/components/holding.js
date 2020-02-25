import React from "react";

const color = (latestPrice, open) => {
    const diff = latestPrice - open;
    if(diff > 0) {
        return "green";
    } else if(diff < 0) {
        return "red";
    } else {
        return "yellow"
    }
}

const Holding = props => {
    const { holding, latestPrice } = props;

    return(
        <div>
            {holding.ticker}
            <div>
            {holding.quantity} @ <div className={(!!latestPrice) ? color(latestPrice, open) : null} > {latestPrice} </div>
            </div>
            <hr />
        </div>
    )
}

export default Holding;
