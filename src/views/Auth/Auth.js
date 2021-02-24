import React from 'react'
import {Authenticator} from 'aws-amplify-react'
import {Logger} from "aws-amplify";
import {ForgotPassword, ForgotPasswordReset, Signin, Signup, SignupConfirm} from './';
import {useRouter} from 'next/router'

const logger = new Logger('Auth');

const CustomAuthenticator = (router) => {

    const handleAuthStateChange = (state) => {

        logger.debug("Changing state to ", state)
        if (state === 'signedIn') {
            // window.location.replace('/');
            router.push('/index')
        }
    }

    return (
        <Authenticator hideDefault={true} onStateChange={handleAuthStateChange}>
            <Signin/>
            <Signup/>
            <SignupConfirm/>
            <ForgotPassword/>
            <ForgotPasswordReset/>
        </Authenticator>
    )
}

const Auth = ({user}) => {

    const router = useRouter()

    return (
        <React.Fragment>
            User={user}
            <CustomAuthenticator router/>
        </React.Fragment>
    )
}

export default Auth