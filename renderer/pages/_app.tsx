import React from 'react';
import type { AppProps } from 'next/app';
import { store } from '../redux/store';
import '../styles/globals.css';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />;
    </Provider>
  );
}

export default MyApp;
