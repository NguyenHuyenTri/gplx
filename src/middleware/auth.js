import axios from 'axios';
import authTypes from '../reducers/authState/authTypes';
import _ from 'lodash';

export const onAuthSuccess = () => (next) => (action) => {
  if (action.type === authTypes.LOGIN_SUCCESS) {
    const { accessToken } = action.payload;

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
  } else if (action.type === authTypes.LOGIN_FAILED) {
    delete axios.defaults.headers.Authorization;
  }

  return next(action);
};

export const checkAuthOnRehydrate = () => (next) => (action) => {
  if (action.type === 'persist/REHYDRATE') {
    if (_.get(action, 'payload.auth.user.accessToken')) {
      const { accessToken } = action.payload.auth.user;
      axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    } else {
      delete axios.defaults.headers.Authorization;
    }
  }

  return next(action);
};
