import './style/app';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@app/containers/App';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';
import apolloClient from './apolloClient';

// Render the application
(function() {
  Loadable.preloadReady().then(() => {
    ReactDOM.hydrate(
      <BrowserRouter>
        <ApolloProvider client={apolloClient}>
          <App />
        </ApolloProvider>
      </BrowserRouter>,
      document.getElementById('app')
    );
  });
})();
