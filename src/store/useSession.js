import React, {useCallback, useEffect, useLayoutEffect, useState} from 'react'

import {Auth, Hub, Logger} from 'aws-amplify'

const logger = new Logger('useSession');

/**
 * Handle user authentication and related features.
 *
 * @returns {{
 *   isAuthenticated: boolean,
 *   user: CognitoUser,
 *   error: any,
 *   signIn: function,
 *   signOut: function
 * }}
 *
 * @see https://aws-amplify.github.io/amplify-js/api/classes/authclass.html
 * @see https://aws-amplify.github.io/amplify-js/api/classes/hubclass.html
 * @see https://aws-amplify.github.io/docs/js/hub#listening-authentication-events
 * @see https://github.com/aws-amplify/amplify-js/blob/master/packages/amazon-cognito-identity-js/src/CognitoUser.js
 * @see https://github.com/aws-amplify/amplify-js/issues/5284
 * @see https://github.com/aws-amplify/amplify-js/issues/3640
 * @see https://medium.com/better-programming/build-a-react-app-with-authentication-using-aws-amplify-49db1dfdc290
 * @see https://medium.com/@georgemccreadie/introduction-to-using-aws-cognito-hosted-ui-with-amplify-js-4711cf4f925a
 */
const useSession = () => {
  const [stage, setStage] = useState(0)
  const [isLoading, setLoading] = useState(false)
  const [user, setUser] = useState(null) // cognito user
  const [isAuthenticated, setIsAuthenticated] = useState(!!user)
  const [error, setError] = useState(false)

  const refreshState = useCallback(() => {

    setStage(1)
    setLoading(true)

    Auth.currentAuthenticatedUser()
    .then(user => {
      setLoading(false)
      setStage(2)
      setUser(user)
      setIsAuthenticated(_isAuthenticated(user))
      setError(null)
    })
    .catch(err => {
      setLoading(false)
      setStage(3)
      logger.error("Error authenticating user", err)
      setIsAuthenticated(false)
      if (err === 'not authenticated') {
        setError(null)

      } else {
        setError(err)
      }
    })

    return () => {
      setStage(0)
      setLoading(false)
    }
  }, [])

  // Make sure our state is loaded before first render
  useLayoutEffect(() => {
    if (!user) {
      refreshState()
    }
  }, [refreshState, user])

  // Subscribe to auth events
  useEffect(() => {
    const authListener = ({payload}) => {
      switch (payload.event) {
        case 'configured':
          logger.debug('the AuthComponent module is configured');
          break;
        case 'signIn':
          logger.debug('user signed in ', user);
          break;
        case 'signIn_failure':
          logger.debug('user signin ko');
          break;
        case 'signIn_success':
          logger.debug('user signin ok');
          break;
        case 'signOut':
          logger.debug('user signed out');
          refreshState()
          break

        default:
          break
      }
    }

    Hub.listen('auth', authListener)

    return () => {
      Hub.remove('auth', authListener)
    }
  }, [refreshState])

  const signIn = useCallback(() => {
    Auth.federatedSignIn(/*{ provider: 'COGNITO' }*/).catch(err => {
      setError(err)
    })
  }, [])

  const signOut = useCallback(() => {
    Auth.signOut()
    .then(_ => refreshState())
    .catch(err => {
      setError(err)
    })
  }, [refreshState])

  return {
    isAuthenticated,
    user,
    error,
    signIn,
    signOut,
    stage,
    isLoading
  }
}

const _isAuthenticated = user => {
  if (
      !user ||
      !user.signInUserSession ||
      !user.signInUserSession.isValid ||
      !user.signInUserSession.accessToken ||
      !user.signInUserSession.accessToken.getExpiration
  ) {
    return false;
  }

  const session = user.signInUserSession
  const isValid = session.isValid() || false

  const sessionExpiry = new Date(session.accessToken.getExpiration() * 1000)
  const isExpired = new Date() > sessionExpiry

  return isValid && !isExpired
}

export default useSession
