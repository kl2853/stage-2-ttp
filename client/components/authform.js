import React from "react"
import { connect } from "react-redux"
import { auth } from "../store"

const AuthForm = props => {
    const { name, displayName, handleSubmit, error } = props
    
    return(
        <div id="authform">
            <div className="formcontainer">
                <form onSubmit={handleSubmit} name={name}>
                    <div className="row">
                        <div className="col" >
                        { (name === "signup") &&
                            (<label htmlFor="fullName">
                                <small>FULL NAME</small>
                            </label>)
                        }
                            <label htmlFor="email">
                                <small>EMAIL</small>
                            </label>
                            <label htmlFor="password">
                                <small>PASSWORD</small>
                            </label>
                        </div>
                        <div className="col">
                        { (name === "signup") &&
                            (<input name="fullName" type="text" placeholder="FULL NAME" />)
                        }
                            <input name="email" type="text" placeholder="EMAIL ADDRESS" />
                            <input name="password" type="password" placeholder="PASSWORD" />
                        </div>
                    </div>
                    <div className="row">
                        <div id="formbutton">
                            <button type="submit">{displayName}</button>
                        </div>
                    </div>
                    {error && error.response && <div> {error.response.data} </div>}
                </form>
            </div>
        </div>
    )
}

const mapLogin = state => {
    return {
        name: "login",
        displayName: "LOGIN",
        error: state.userState.error
    }
}

const mapSignup = state => {
    return {
        name: "signup",
        displayName: "SIGN UP",
        error: state.userState.error
    }
}

const mapDispatchAuth = dispatch => {
    return {
        handleSubmit(evt) {
            evt.preventDefault() // prevents page refresh
            const formName = evt.target.name
            const fullName = (formName === "signup") 
                ? evt.target.fullName.value
                : null
            const email = evt.target.email.value
            const password = evt.target.password.value
            dispatch(auth(fullName, email, password, formName))
        }
    }
}

export const Login = connect(mapLogin, mapDispatchAuth)(AuthForm)
export const Signup = connect(mapSignup, mapDispatchAuth)(AuthForm)
