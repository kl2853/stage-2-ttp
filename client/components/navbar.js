import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const NavBar = ({ handleClick, isLoggedIn }) => (
    <div>
        <h3>Stock Portfolio</h3>
            <nav>
                {
                    isLoggedIn
                    ? (
                        <div>
                            <Link to="/myportfolio">Portfolio</Link>
                            <Link to="/mytransactions">Transactions</Link>
                            <a href="#" onClick={ handleClick }>Logout</a>
                        </div>
                    )
                    : (
                        <div>
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Signup</Link>
                        </div>
                    )
                }
            </nav>
        <hr />
    </div>
)

const mapState = state => {
    return {
        isLoggedIn: !!state.userState.id
    }
}

const mapDispatch = dispatch => {
    return {
        handleClick() {
            dispatch(logout());
        }
    }
}

export default connect(mapState, mapDispatch)(NavBar);
