import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
import localStorage from '@shared/lib/localStorage';

// Hydrate the apollo state from server state.
const initialState = window.__APOLLO_STATE__;

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
  uri: `${process.env.APPLICATION_BASE_URL}/api`,
  credentials: 'same-origin'
});
const cache = new InMemoryCache().restore(initialState);

export default new ApolloClient({
  link: authLink.concat(httpLink),
  cache
});
