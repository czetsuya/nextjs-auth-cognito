import React from 'react'
import {useAuthContext} from "../../contexts/AuthContext";
import styles from "../Home/Home.module.css";
import Head from "next/head";
import {Button} from "@material-ui/core";
import Link from "next/link";

const Secured = () => {

    const {auth} = useAuthContext();

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