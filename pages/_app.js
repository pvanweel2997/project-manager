import * as React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material';
import theme from '../src/ui/Theme';
import createEmotionCache from '../src/createEmotionCache';
import Header from '../src/ui/Header';
import Footer from '../src/ui/Footer';
import { CssBaseline } from '@mui/material';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  // return (
  //   <CacheProvider value={emotionCache}>
  //     <Head>
  //       <meta name="viewport" content="initial-scale=1, width=device-width" />
  //     </Head>
  //     <ThemeProvider theme={theme}>
  //       {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
  //       <CssBaseline />
  //       <Header />
  //       <Component {...pageProps} />
  //       <Footer />
  //     </ThemeProvider>
  //   </CacheProvider>
  // );
  return (
    <React.Fragment>
      <Head>
        <title>My page</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <Header />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
