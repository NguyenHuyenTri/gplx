import _ from 'lodash';
import types from './authTypes';

const initialState = {
  loading: true,
  isAuth: false,
  user: {},
  dataUser: {},
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: true };

    case types.LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        loading: false,
        isAuth: true,
      };

    case types.LOAD_DATA_USER:
      return {
        ...state,
        dataUser: action.payload,
        loading: false,
        isAuth: true,
      };

    case types.LOGIN_FAILED:
      return initialState;

    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        user: {
          ...action.payload,
        },
        loading: false,
        isAuth: true,
      };

    case types.LOAD_USER_FAILED:
      return initialState;

    case types.LOGOUT:
      return { loading: true, isAuth: false, user: {} };

    default:
      return state;
  }
};

export default authReducer;
