import React from "react";
import { connect } from "react-redux";
import { auth } from "../store";

const AuthForm = props => {
    const { name, displayName, handleSubmit, error } = props;

    return(
        <div>
            <form onSubmit={handleSubmit} name={name}>
                { (name === "signup") &&
                (<div>
                    <label htmlFor="fullName">
                        <small>FULL NAME</small>
                    </label>
                    <input name="fullName" type="text" />
                </div>)
                }
                <div>
                    <label htmlFor="email">
                        <small>EMAIL</small>
                    </label>
                    <input name="email" type="text" />
                </div>
                <div>
                    <label htmlFor="password">
                        <small>PASSWORD</small>
                    </label>
                    <input name="password" type="text" />
                </div>
                <div>
                    <button type="submit">{displayName}</button>
                </div>
                {error && error.response && <div> {error.response.data} </div>}
            </form>
        </div>
    )
}

const mapLogin = state => {
    return {
        name: "login",
        displayName: "Login",
        error: state.user.error
    }
}

const mapSignup = state => {
    return {
        name: "signup",
        displayName: "Sign Up",
        error: state.user.error
    }
}

const mapDispatchAuth = dispatch => {
    return {
        handleSubmit(evt) {
            evt.preventDefault();
            const formName = evt.target.name;
            const fullName = (formName === "signup") 
                ? evt.target.fullName.value
                : null;
            const email = evt.target.email.value;
            const password = evt.target.password.value;
            dispatch(auth(fullName, email, password, formName));
        }
    }
}

export const Login = connect(mapLogin, mapDispatchAuth)(AuthForm);
export const Signup = connect(mapSignup, mapDispatchAuth)(AuthForm);
