import React from "react";
import axios from "axios";
import { IEX_PUBLIC_KEY } from "../../keys";

const testing = async function(ticker) {
    try {
        const baseUrl = "https://sandbox.iexapis.com/stable"
        const { data } = await axios.get(`${baseUrl}/stock/${ticker}/quote?token=${IEX_PUBLIC_KEY}`);
        console.log(data.companyName, data.latestPrice);
    } catch (err) {
        console.error(err);
    }
}

class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        if (!!evt.target.value.length) testing(evt.target.value);
    }

    render() {
        return (
            <div>
                <input name="ticker" onChange={this.handleChange} placeholder="Search by ticker symbol"/>
            </div>
        )
    }
}

export default SearchBar;
