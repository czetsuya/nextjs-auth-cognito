import Amplify, {Logger, withSSRContext} from "aws-amplify";
import {awsConfig} from '../../src/config/aws-export'

Amplify.configure({...awsConfig, ssr: true})

const logger = new Logger('authtest')
export default async (req, res) => {

  const {Auth} = withSSRContext({req});

  let token;
  let user;
  try {
    user = await Auth.currentAuthenticatedUser();
    logger.debug('user is authenticated ', user);
    logger.debug('accessToken ', user.signInUserSession.accessToken.jwtToken)
    token = user.signInUserSession.accessToken.jwtToken;
    // fetch some data and assign it to the data variable

  } catch (err) {
    logger.error('error: no authenticated user');
  }

  res.statusCode = 200;
  res.json({
    token: token ? token : null,
    username: user ? user.username : null
  })
}