import React from 'react'
import {Authenticator} from 'aws-amplify-react'
import {Logger} from "aws-amplify";
import {ForgotPassword, ForgotPasswordReset, Signin, Signup, SignupConfirm} from './';
import {useRouter} from 'next/router'
import {AuthState} from "@aws-amplify/ui-components";

const logger = new Logger('Auth');

const CustomAuthenticator = ({router}) => {

  const handleAuthStateChange = (state) => {

    // redirect depending on role
    logger.debug("Changing state to ", state)
    if (state === AuthState.SignIn) {
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