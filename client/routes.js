import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { me } from "./store";
import { Login, Signup, Portfolio, SearchBar, Transactions } from "./components";

class Routes extends React.Component {
    componentDidMount() {
        this.props.loadData();
    }

    render() {
        // verifying user throughout site
        const { isLoggedIn } = this.props;

        return(
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                {isLoggedIn && (
                    <Switch>
                        <Route path="/myportfolio" render={props => 
                            <div>
                                <Portfolio />
                                <SearchBar />
                            </div>} />
                        <Route path="/mytransactions" component={Transactions} />
                    </Switch>
                )}
            </Switch>
        )
    }
}

const mapState = state => {
    return {
        isLoggedIn: !!state.userState.id
    }
}

const mapDispatch = dispatch => {
    return {
        loadData() {
            dispatch(me());
        }
    }
}

export default withRouter(connect(mapState, mapDispatch)(Routes));
