import {getServerSideAuth} from "../../src/utils/AuthUtils"

export default async (req, res) => {

  const initialAuth = getServerSideAuth(req)

  console.log("accessToken=", initialAuth.accessToken)

  if (initialAuth) {
    res.status(200).json({status: 'success'})

  } else {
    res.status(400).json({status: 'fail'})
  }
}