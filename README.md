*If you would like to support these tutorials, you can contribute to my [Patreon account](https://patreon.com/czetsuya)

# NextJS Authentication with Amazon Cognito

This project is built on top of NextJS and is integrated with Amazon Cognito to provide Auth functionality such as signup, signin, and password reset.

## Amazon Cognito

For the Authentication features to work, you must have an AWS account to use the Cognito service.

Create a Cognito User pool, App client, and setup the domain.

Finally, open the file .env and update the values being asked.

## Getting Started

Install the dependencies:

```bash
yarn install
```

Create the pems.json file required by the API code.

```bash
yarn prepare-pems --region <AWS_REGION> --userPoolId <AWS_USER_POOL_ID>
```

Run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser and navigate to the signin page.
Note that you must have already added test emails in Google for testing.

After successfully signing in, the API can be access at: http://localhost:3000/api/authtest