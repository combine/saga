import createAppStore from '@app/store';
import createAdminStore from '@admin/store';
import AdminContainer from '@admin/containers/App';
import AppContainer from '@app/containers/App';
import { setMobileDetect, mobileParser } from 'react-responsive-redux';
import { get } from 'lodash';

export const getInitialState = (user) => {
  if (user) {
    return {
      auth: {
        isLoading: false,
        isLoggedIn: true,
        isAdmin: user.hasRole('admin'),
        user: user.toJSON()
      }
    };
  }

  return {};
};

export const getFinalState = (store, req) => {
  // Server side responsive detection
  const mobileDetect = mobileParser(req);

  // set mobile detection for our responsive store
  store.dispatch(setMobileDetect(mobileDetect));

  return store.getState();
};

export default function createStore(matches, req) {
  const matchPath = get(matches[0], 'route.path');
  const layout = matchPath.match(/\/admin/) ? 'admin' : 'app';
  const state = getInitialState(req.user);

  const isAdmin = req.user && req.user.role === 'admin' && layout === 'admin';
  const store = isAdmin ? createAdminStore(state) : createAppStore(state);
  const finalState = getFinalState(store, req);
  const App = isAdmin ? AdminContainer : AppContainer;

  return {
    store,
    finalState,
    layout,
    App
  };
}
