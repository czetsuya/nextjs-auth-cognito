/**
 * Caution: Consider this file when using NextJS
 *
 * You may delete this file and its occurrences from the project filesystem if you are using GatsbyJS or react-scripts version
 */
import React from 'react';
import Document, {Head, Html, Main, NextScript} from 'next/document';
import {ServerStyleSheets} from '@material-ui/core/styles';

export default class MyDocument extends Document {
  render() {
    return (
        <Html lang="en">
          <Head>
            <meta charSet="utf-8"/>
            <link rel="shortcut icon" href="/assets/favicon.ico"/>
            <meta name="theme-color" content="#ffffff"/>
            <meta
                name="description"
                content="NextJS integration with Amazon Cognito."
            />
            <meta
                name="robots"
                content="max-snippet:-1, max-image-preview:large, max-video-preview:-1"
            />
            <meta property="og:locale" content="en_US"/>
            <meta property="og:type" content="website"/>
            <meta
                property="og:image"
                content="https://4.bp.blogspot.com/-mjqhWWOAQ4k/YHGCZ8vh16I/AAAAAAAAMk4/ciGAb0cebQkuXMS_2y_r_BIa20aaXgoYgCK4BGAYYCw/s1600/Artboard%2B1.png"
            />
            <meta
                property="og:title"
                content="NextJS Amazon Cognito Integration | Czetsuya Tech"
            />
            <meta
                property="og:description"
                content="NextJS integration with Amazon Cognito."
            />
            <meta property="og:url" content="https://czetsuyatech.com/"/>
            <link
                href="https://fonts.googleapis.com/css?family=Lato:100,100i,300,300i,400,400i,700,700i,900,900i&display=swap"
                rel="stylesheet"
            />
            <script
                src="https://kit.fontawesome.com/4c273e6d43.js"
                crossOrigin="anonymous"
            ></script>
            <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
          </Head>
          <body>
          <Main/>
          <NextScript/>
          </body>
        </Html>
    );
  }
}

// `getInitialProps` belongs to `_document` (instead of `_app`),
// it's compatible with server-side generation (SSG).
MyDocument.getInitialProps = async (ctx) => {
  // Resolution order
  //
  // On the server:
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. document.getInitialProps
  // 4. app.render
  // 5. page.render
  // 6. document.render
  //
  // On the server with error:
  // 1. document.getInitialProps
  // 2. app.render
  // 3. page.render
  // 4. document.render
  //
  // On the client
  // 1. app.getInitialProps
  // 2. page.getInitialProps
  // 3. app.render
  // 4. page.render

  // Render app and page and get the context of the page with collected side effects.
  const sheets = new ServerStyleSheets();
  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
      originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });

  const initialProps = await Document.getInitialProps(ctx);

  return {
    ...initialProps,
    // Styles fragment is rendered after the app and page rendering finish.
    styles: [...React.Children.toArray(initialProps.styles), sheets.getStyleElement()],
  };
};