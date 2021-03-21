import React, {useState} from 'react'
import styles from "../Home/Home.module.css";
import Head from "next/head";
import {Button} from "@material-ui/core";
import Link from "next/link";
import {Auth, Logger} from "aws-amplify";
import {useAuthContext} from "../../contexts/AuthContext";
import * as StringUtils from "../../utils/StringUtils";
import {Adsense} from '../../components/atoms'

const logger = new Logger('Secured');

const Secured = () => {

  const {auth} = useAuthContext()
  const {user} = auth;
  const providerInfo = JSON.parse(user.attributes.identities)
  const [token, setToken] = useState()
  const username = StringUtils.replaceLastN(user.username, 16)
  const userId = StringUtils.replaceLastN(providerInfo[0].userId, 16)

  Auth.currentSession().then(data => setToken(data.accessToken.jwtToken));

  return (
      <div className={styles.container}>
        <Head>
          <title>Create Next App</title>
          <link rel="icon" href="/favicon.ico"/>
        </Head>

        <main className={styles.main}>
          <h1 className={styles.title}>
            Welcome to <a href="https://nextjs.org">Next.js!</a>
          </h1>

          <p className={styles.description}>
            Integration with Amazon Cognito
          </p>

          <div className={styles.grid}>
            <div className={styles.card}>
              <h3>User Info</h3>
              <div>Username: {username}</div>
              <div>Email: {user.attributes.email}</div>
              <div>Given name: {user.attributes.given_name}</div>
              <div>Family name: {user.attributes.family_name}</div>
              <div>Provider name: {providerInfo[0].providerName}</div>
              <div>User Id: {userId}</div>
            </div>
            <div className={styles.card}>
              <div className={styles.wrapToken}>{token}</div>
            </div>
            <div className={styles.card}>
              <h3>Authentication &rarr;</h3>
              {auth.isAuthenticated &&

              <Button onClick={auth.signOut}>Signout</Button>
              }
              {!auth.isAuthenticated &&
              <Link href="/signin">
                <a>Sign in to Amazon Cognito</a>
              </Link>
              }
            </div>
          </div>
          <div>
            <Adsense/>
          </div>
        </main>

        <footer className={styles.footer}>
          <a
              href="https://www.czetsuyatech.com/"
              target="_blank"
              rel="noopener noreferrer"
          >
            Czetsuya Tech
          </a>
        </footer>
      </div>
  )
}

export default Secured