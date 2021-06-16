/**
 * Caution: Consider this file when using NextJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or react-scripts version
 */
import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';

import 'react-lazy-load-image-component/src/effects/opacity.css';
import 'leaflet/dist/leaflet.css';
import 'assets/css/index.css';
import 'swiper/swiper-bundle.css'
import 'aos/dist/aos.css';
import {awsConfig} from '../src/config/aws-export';
import Amplify from 'aws-amplify';

Amplify.Logger.LOG_LEVEL = 'DEBUG';

Amplify.configure(awsConfig);

const App = ({Component, pageProps}) => {

  return (
      <React.Fragment>
        <Head>
          <meta
              name="viewport"
              content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </Head>
        <Component {...pageProps} />
      </React.Fragment>
  );
}

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};

export default App