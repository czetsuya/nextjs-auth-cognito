import Head from 'next/head'
import styles from '../styles/Home.module.css'
import {Logger} from 'aws-amplify'
import Link from 'next/link';
import useAuthentication from "../src/hooks/useAuthentication";
import {Button} from "@material-ui/core";

const logger = new Logger('SignOut');

const Home = ({dispatch}) => {

    const auth = useAuthentication({dispatch});

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

export default Home;