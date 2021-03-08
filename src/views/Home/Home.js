import Head from 'next/head'
import styles from './Home.module.css'
import {Logger} from 'aws-amplify'
import Link from 'next/link'
import {useAuthContext} from '../../contexts/AuthContext'

const logger = new Logger('Home');

const Home = () => {

    const {auth} = useAuthContext()
    logger.debug("home auth ", auth)

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

                        {!auth.isLoading && !auth.isAuthenticated &&
                        <Link component="button"
                              href="/signin">
                            <a>Sign in to Amazon Cognito</a>
                        </Link>
                        }
                        {!auth.isLoading && auth.isAuthenticated &&
                        <Link component="button" href="#">
                            <a onClick={auth.signOut}>Signout</a>
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