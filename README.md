# NextJS Authentication with Amazon Cognito

This project is built on top of NextJS and is integrated with Amazon Cognito to provide AuthComponent functionality such as signup, signin, and password reset.

Blog: https://www.czetsuyatech.com/2022/01/nextjs-secure-application-with-aws-amplify-and-cognito.html

## Amazon Cognito

For the Authentication features to work, you must have an AWS account to use the Cognito service.

Create a Cognito User pool, App client, and setup the domain.

Finally, open the file .env and update the values being asked.

Note: We are using [SSR Support for AWS Amplify JavaScript Libraries](https://aws.amazon.com/de/blogs/mobile/ssr-support-for-aws-amplify-javascript-libraries/)  
To get the token in the API. This can be 
useful when we want our NextJS API to act as a gateway and forward the request to an external API with the bearer token.

## Getting Started

Install the dependencies:

```bash
yarn install
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and navigate to the signin page.
Note that you must have already added test emails in Google for testing.

After successfully signing in, the API can be access at: http://localhost:3000/api/authtest

## Definition of Terms

 - Customize UI components - https://docs.amplify.aws/lib/auth/customui/q/platform/js#custom_auth-flow
 - authData - https://docs.amplify.aws/ui/auth/authenticator/q/framework/react-native#show-your-app-after-sign-in
 - authState - https://docs.amplify.aws/ui/auth/authenticator/q/framework/react#authstate
 - onStateChange - https://docs.amplify.aws/ui/auth/authenticator/q/framework/react-native#customize-your-own-components

## References

- https://docs.amplify.aws/lib/auth/customui/q/platform/js
- https://www.czetsuyatech.com/2021/06/nextjs-security-with-aws-cognito.html
