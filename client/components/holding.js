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
    if(priceArr && !!priceArr.length) {
        // day open prices are only available after 8pm
        // at any other time user will see previous close prices
        if(priceArr[0] !== null) openPrice = priceArr[0];
        else openPrice = priceArr[2];
        latestPrice = priceArr[1];
    }
    
    return(
        <div>
            <div className="rtstock">
                <div className="rtstockcontainer">
                    <div className="holding">
                        {holding.ticker}
                    </div>
                    <div className="qty">
                        {holding.quantity} 
                    </div>
                </div>
                <div className="rtstockcontainer"></div>
                    <div className="atsymbol">
                        @
                    </div>
                    <div className={(!!latestPrice && !!(latestPrice - openPrice)) ? color(latestPrice, openPrice) : null}>
                    {latestPrice}
                    </div>
                </div>
        </div>
    )
}

export default Holding;
