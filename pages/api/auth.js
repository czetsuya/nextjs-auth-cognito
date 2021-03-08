import Cookies from 'cookies'

export default (req, res) => {

    console.log('req ', req.headers)

    const cookies = new Cookies(req, res)
    // Get a cookie
    const username = cookies.get('CognitoIdentityServiceProvider.5m4mjt98q2348f34gvpk90bhsc.Google_104543028830140686248.userData')

    res.statusCode = 200
    res.json({name: username})
}