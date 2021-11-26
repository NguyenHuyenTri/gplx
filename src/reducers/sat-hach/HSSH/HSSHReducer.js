import _ from 'lodash';
import types from './DVHCTypes';

const initialState = {
  loading: {},
  sanTap:{}
};

const SanTapReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: { ...state.loading, ...action.payload } };

    case types.GET_SAN_TAP:
      return { ...state, sanTap: action.payload };

    default:
      return state;
  }
};

export default SanTapReducer;
