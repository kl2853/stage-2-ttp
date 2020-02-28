import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";

const NavBar = ({ handleClick, isLoggedIn }) => (
    <div id="header">
        <div id="logocontainer">
            <h1 id="logo"><a href="/">STOCK PORTFOLIO</a></h1>
        </div>
        <nav id="navbar">
            {
                isLoggedIn
                ? (
                    <div id="navcontainer">
                        <div className="navbutton">
                            <Link to="/myportfolio" className="navlink">PORTFOLIO</Link>
                        </div>
                        <div className="navbutton">
                            <Link to="/mytransactions" className="navlink">TRANSACTIONS</Link>
                        </div>
                        <div className="navbutton">
                            <a href="#" onClick={ handleClick } className="navlink">LOGOUT</a>
                        </div>
                    </div>
                )
                : (
                    <div id="navcontainer">
                        <div className="navbutton">
                            <Link to="/login" className="navlink">LOGIN</Link>
                        </div>
                        <div className="navbutton">
                            <Link to="/signup" className="navlink">SIGNUP</Link>
                        </div>
                    </div>
                )
            }
        </nav>
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
