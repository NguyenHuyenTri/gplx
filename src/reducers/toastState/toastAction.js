import _ from 'lodash';
import types from './toastTypes';

const setToast = (payload) => ({
  type: types.SET_TOAST,
  payload,
});
