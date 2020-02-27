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
    let { holding, priceArr } = props;
    let openPrice;
    let latestPrice;
    if(!!priceArr && !!priceArr.length) {
        // day's open prices not available until after 8pm
        // if before 8pm, previousClose prices subbed in
        if(priceArr[0] === null) openPrice = priceArr[2];
        else openPrice = priceArr[0];
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
