import {Auth} from 'aws-amplify';

export default async (req, res) => {

    const result = await Auth.currentSession().then(response => {
        let accessToken = response.getAccessToken();
        let jwt = accessToken.getJwtToken();

        //You can print them to see the full objects
        console.log(`myAccessToken: ${JSON.stringify(accessToken)}`);
        console.log(`myJwt: ${jwt}`);

        res.statusCode = 200;
        res.json({'token': jwt});

    }).catch(e => {
        console.log(e);
        res.statusCode = 200;
        res.json({name: e});
    })
}