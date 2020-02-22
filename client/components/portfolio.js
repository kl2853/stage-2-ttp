import React from "react";
import { connect } from "react-redux";

export const Portfolio = props => {
    const { fullName } = props;

    return(
        <div>
            Hello {fullName}!
        </div>
    )
}

const mapState = state => {
    return {
        fullName: state.userState.name
    }
}

export default connect(mapState)(Portfolio);
