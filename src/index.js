import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Auth0Provider } from './react-auth0-spa'
import * as serviceWorker from './serviceWorker';
import history from "./history";

const { REACT_APP_AUTH0_DOMAIN, REACT_APP_AUTH0_CLIENTID } = process.env;

// A function that routes the user to the right place after login
const onRedirectCallback = appState => {
  history.push(
    appState && appState.targetUrl
      ? appState.targetUrl
      : window.location.pathname
  );
};

ReactDOM.render(
  <Auth0Provider
    domain={REACT_APP_AUTH0_DOMAIN}
    client_id={REACT_APP_AUTH0_CLIENTID}
    redirect_uri={window.location.origin}
    onRedirectCallback={onRedirectCallback}
  >
    <App />
  </Auth0Provider>,
  document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Experimental: Sentry
// window.Raven && window.Raven.config('https://b94b68e1f4b64d7ca888114b7df0439d@sentry.alphapoint.cloud/11').install()