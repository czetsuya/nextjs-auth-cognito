import Amplify, { Auth } from 'aws-amplify';

Amplify.configure({
    Auth: {

        // REQUIRED only for Federated Authentication - Amazon Cognito Identity Pool ID
        // identityPoolId: 'us-east-2:51685aa4-1c4d-485e-b88b-d53b48dc2443',

        // REQUIRED - Amazon Cognito Region
        region: process.env.NEXT_PUBLIC_AWS_COGNITO_REGION,

        // OPTIONAL - Amazon Cognito Federated Identity Pool Region
        // Required only if it's different from Amazon Cognito Region
        // identityPoolRegion: 'XX-XXXX-X',

        // OPTIONAL - Amazon Cognito User Pool ID
        userPoolId: process.env.NEXT_PUBLIC_AWS_COGNITO_POOL_ID,

        // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
        userPoolWebClientId: process.env.NEXT_PUBLIC_AWS_COGNITO_WEB_CLIENT_ID,

        // OPTIONAL - Enforce user authentication prior to accessing AWS resources or not
        mandatorySignIn: true,

        // OPTIONAL - Configuration for cookie storage
        // Note: if the secure flag is set to true, then the cookie transmission requires a secure protocol
        cookieStorage: {
            // REQUIRED - Cookie domain (only required if cookieStorage is provided)
            domain: 'localhost',
            // OPTIONAL - Cookie path
            path: '/',
            // OPTIONAL - Cookie expiration in days
            expires: 1,
            // OPTIONAL - See: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Set-Cookie/SameSite
            sameSite: "strict",
            // OPTIONAL - Cookie secure flag
            // Either true or false, indicating if the cookie transmission requires a secure protocol (https).
            secure: false
        },

        // OPTIONAL - customized storage object
        // storage: MyStorage,

        // OPTIONAL - Manually set the authentication flow type. Default is 'USER_SRP_AUTH'
        authenticationFlowType: 'USER_PASSWORD_AUTH',

        // OPTIONAL - Manually set key value pairs that can be passed to Cognito Lambda Triggers
        clientMetadata: { project: 'sparqr' },

        // OPTIONAL - Hosted UI configuration
        oauth: {
            domain: process.env.NEXT_PUBLIC_AWS_COGNITO_OAUTH_DOMAIN,
            scope: ['email', 'profile', 'openid', 'aws.cognito.signin.user.admin'],
            redirectSignIn: process.env.NEXT_PUBLIC_AWS_COGNITO_REDIRECT_SIGNIN,
            redirectSignOut: process.env.NEXT_PUBLIC_AWS_COGNITO_REDIRECT_SIGNOUT,
            responseType: 'code' // or 'token', note that REFRESH token will only be generated when the responseType is code
        }
    }
});

// You can get the current config object
export const awsConfig = Auth.configure();