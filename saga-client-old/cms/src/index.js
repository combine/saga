import 'semantic-ui-css/semantic.min.css';
import '@admin/assets/css/base/index.scss';
import React from 'react';
import ReactDOM from 'react-dom';
import App from '@admin/containers/App';
import Loadable from 'react-loadable';
import { BrowserRouter } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

// Set authentication tokens
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  let token = localStorage.get('token');
  let context = { headers };

  if (token) {
    context.headers = {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    };
  }

  return context;
});

const httpLink = new HttpLink({
  uri: process.env.BASE_API_URL,
  credentials: 'same-origin'
});

const apolloClient = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__)
});


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
