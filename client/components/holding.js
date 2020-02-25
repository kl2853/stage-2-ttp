import React from "react";

const Holding = props => {
    const { holding, latestPrice } = props;
    return(
        <div>
            {holding.ticker}, 
            <small>{holding.quantity} @ {latestPrice}</small>
            <hr />
        </div>
    )
}

export default Holding;
