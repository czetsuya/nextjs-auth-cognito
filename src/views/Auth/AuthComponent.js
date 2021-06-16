import React from 'react'
import {Authenticator} from 'aws-amplify-react'
import {Logger} from "aws-amplify";
import {ForgotPassword, ForgotPasswordReset, Signin, Signup, SignupConfirm} from './';
import {useRouter} from 'next/router'

const logger = new Logger('AuthComponent');

const AuthComponent = () => {

  logger.debug('signing in')

  const router = useRouter()

  const handleAuthStateChange = (state) => {

    // redirect depending on role
    logger.debug("Changing state to", state)
    if (state === 'signedIn') {
      router.push('/secured')
    }
  }

  return (
      <React.Fragment>
        <Authenticator hideDefault={true} onStateChange={handleAuthStateChange}>
          <Signin/>
          <Signup/>
          <SignupConfirm/>
          <ForgotPassword/>
          <ForgotPasswordReset/>
        </Authenticator>
      </React.Fragment>
  )
}

export default AuthComponent