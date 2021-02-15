import React from 'react'
import {Authenticator} from 'aws-amplify-react'
import {ForgotPassword, Signin, Signup, SignupConfirm, ForgotPasswordReset} from './';

/*const AlwaysOn = ({onStateChange, authState}) => {
    return (
        <div>
            <div>I am always here to show current auth state: {authState}</div>
            <button onClick={() => onStateChange('signUp')}>Show Sign Up</button>
        </div>
    )
}*/

const CustomAuthenticator = props => {
    return (
        <Authenticator hideDefault={true}>
            <Signin/>
            <Signup/>
            <SignupConfirm/>
            <ForgotPassword/>
            <ForgotPasswordReset/>
        </Authenticator>
    )
}

const Auth = () => {

    return (
        <React.Fragment>
            <CustomAuthenticator/>
        </React.Fragment>
    )
}

export default Auth