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
    let { holding, latestPrice } = props;
    
    let openPrice = 120;
    // const { holding, priceObj } = props;
    // const { openPrice, latestPrice } = priceObj; open currently returning null from api
    let diff
    if(!!latestPrice) {
        diff = latestPrice - openPrice;
        latestPrice = latestPrice[1];
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
