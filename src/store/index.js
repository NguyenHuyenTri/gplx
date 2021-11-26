import { applyMiddleware, compose, createStore } from 'redux';
import { persistReducer, persistStore } from 'redux-persist';

import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { createBrowserHistory } from 'history';
import rootReducer from './rootReducer';
import { routerMiddleware } from 'connected-react-router';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { checkAuthOnRehydrate, onAuthSuccess } from '../middleware/auth';

export const history = createBrowserHistory();

const initialState = {};
const enhancers = [];
const middleware = [routerMiddleware(history), thunk, onAuthSuccess, checkAuthOnRehydrate];

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'],
  stateReconciler: autoMergeLevel2,
};

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = (window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(applyMiddleware(...middleware), ...enhancers);

const persistedReducer = persistReducer(persistConfig, rootReducer(history));

const store = createStore(persistedReducer, initialState, composedEnhancers);

export const persistor = persistStore(store);

export default store;
