import React from "react";

const color = (latestPrice, openPrice) => {
    let diff = latestPrice - openPrice;
    if(diff > 0) {
        return "green";
    } else if(diff < 0) {
        return "red";
    } else {
        return "yellow"
    }
}

const Holding = props => {
    const { holding, priceArr } = props;
    let openPrice = 0;
    let latestPrice = 0;
    if(priceArr && !!priceArr.length) {
        openPrice = priceArr[0];
        latestPrice = priceArr[1];
    }
    return(
        <div>
            {holding.ticker}
            <div>
            {holding.quantity} @ <div className={(!!latestPrice && !!(latestPrice - openPrice)) ? color(latestPrice, openPrice) : null} > {latestPrice} </div>
            </div>
            <hr />
        </div>
    )
}

export default Holding;
