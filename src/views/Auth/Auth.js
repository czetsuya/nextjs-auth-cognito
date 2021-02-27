import React from 'react'
import {Authenticator} from 'aws-amplify-react'
import {Logger} from "aws-amplify";
import {ForgotPassword, ForgotPasswordReset, Signin, Signup, SignupConfirm} from './';
import {useRouter} from 'next/router'

const logger = new Logger('Auth');

const CustomAuthenticator = ({router}) => {

    const handleAuthStateChange = (state) => {

        logger.debug("Changing state to ", state)
        if (state === 'signedIn') {
            router.push('/secured')
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

const Auth = () => {

    const router = useRouter()

    return (
        <React.Fragment>
            <CustomAuthenticator router={router}/>
        </React.Fragment>
    )
}

export default Auth