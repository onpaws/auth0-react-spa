import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { SessionCheck } from './SessionCheck'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<SessionCheck><App /></SessionCheck>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

// Experimental: Sentry
window.Raven && window.Raven.config('https://b94b68e1f4b64d7ca888114b7df0439d@sentry.alphapoint.cloud/11').install()