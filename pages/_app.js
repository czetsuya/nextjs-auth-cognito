/**
 * Caution: Consider this file when using NextJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or react-scripts version
 */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import {useStore} from '../src/redux/ApplicationStore'
import {Provider} from 'react-redux'
import {persistStore} from 'redux-persist'
import {PersistGate} from 'redux-persist/integration/react'

import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'leaflet/dist/leaflet.css';
import 'assets/css/index.css';
import 'swiper/swiper-bundle.css'
import 'aos/dist/aos.css';
import {awsConfig} from '../src/aws-export';
import Amplify from 'aws-amplify';
import CircularUnderLoad from "../src/components/atoms/ProgressLoaders/CircularUnderLoad";

Amplify.Logger.LOG_LEVEL = 'DEBUG';

Amplify.configure(awsConfig);

const App = ({Component, pageProps}) => {

  const store = useStore(pageProps.initialReduxState)
  const persistor = persistStore(store, {}, () => {
    persistor.persist()
  })

  return (
      <Provider store={store}>
        <PersistGate loading={<><CircularUnderLoad/></>} persistor={persistor}>
          <React.Fragment>
            <Head>
              <meta
                  name="viewport"
                  content="width=device-width, initial-scale=1, shrink-to-fit=no"
              />
            </Head>
            <Component {...pageProps} />
          </React.Fragment> </PersistGate>
      </Provider>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App