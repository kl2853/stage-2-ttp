import React from "react";
import { withRouter, Route, Switch } from "react-router-dom";

class Routes extends React.Component {
    render() {
        const { isLoggedIn } = this.props;

        return(
            <Switch>
                <Route path="/login" />
                <Route path="/signup" />
                {isLoggedIn && (
                    <Switch>
                        <Route path="/myportfolio" />
                        <Route path="/mytransactions" />
                    </Switch>
                )

                }
            </Switch>
        )
    }
}

export default withRouter(Routes);
