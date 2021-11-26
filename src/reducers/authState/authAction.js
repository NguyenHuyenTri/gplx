import _ from 'lodash';
import { push } from 'connected-react-router';
import types from './authTypes';
import { getUser, loginApi, resetPassword } from '../../api/auth-api';

// load user
const loadingUser = () => ({ type: types.LOADING });

const loadUserSuccess = (payload) => ({
  type: types.LOAD_USER_SUCCESS,
  payload,
});

const loadUserFailed = () => ({
  type: types.LOAD_USER_FAILED,
});

const loginSuccess = (payload) => ({
  type: types.LOGIN_SUCCESS,
  payload,
});

const loadDataUserSuccess = (payload) => ({
  type: types.LOAD_DATA_USER,
  payload,
});

export const getUserAction = () => async (dispatch) => {
  try {
    dispatch(loadingUser());
    const res = await getUser();
    if (res) {
      await dispatch(loadDataUserSuccess(res.data));
    } else {
      dispatch(loadUserFailed());
    }
  } catch (error) {
    dispatch(logout());
    dispatch(loadUserFailed());
    dispatch(push('/login'));
  }
};

//login with email
export const loginRequest = (payload) => async (dispatch) => {
  try {
    dispatch(loadingUser());

    const res = await loginApi(payload);
    if (res) {
      await dispatch(loadUserSuccess(res));
      dispatch(push('/home'));

      await dispatch(loginSuccess(res));
    }
  } catch (e) {
    console.error(e);
  }
};

//login with email
export const resetPasswordRequest = (data) => async (dispatch) => {
  try {
    const res = await resetPassword(data);
    alert(res.data.message);
    dispatch(push('/login'));
  } catch (e) {
    alert('Tên đăng nhập không tồn tại');
  }
};

//logout
export const logout = () => ({
  type: types.LOGOUT,
});
