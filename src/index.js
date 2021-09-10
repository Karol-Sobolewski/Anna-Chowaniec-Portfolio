import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { ModalProvider } from 'react-modal-hook';
import { Auth0Provider } from '@auth0/auth0-react';
import * as serviceWorker from './serviceWorker.js';
import store from './redux/store';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import history from './utils/history';

const onRedirectCallback = (appState) => {
  history.push(
    appState && appState.returnTo ? appState.returnTo : window.location.pathname
  );
};

const providerConfig = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN,
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID,
  ...(process.env.REACT_APP_AUTH0_AUDIENCE
    ? { audience: process.env.REACT_APP_AUTH0_AUDIENCE }
    : null),
  redirectUri: window.location.origin,
  onRedirectCallback,
};

ReactDOM.render(
  <Auth0Provider {...providerConfig}> {/* eslint-disable-line */}
    <Provider store={store}>
      <ModalProvider>
        <App />
      </ModalProvider>
    </Provider>
  </Auth0Provider>,
  document.getElementById(`root`)
);
reportWebVitals();
serviceWorker.unregister();
