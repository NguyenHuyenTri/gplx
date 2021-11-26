import _ from 'lodash';
import types from './ThueXeTypes';

const initialState = {
  isLoading: false,
  lichThueXes: [],
};

const ThueXeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING_THUE_XE:
      return { ...state, isLoading: action.isLoading };

    case types.SET_THUE_XE:
      return { ...state, lichThueXes: action.payload.lichThueXes || [], isLoading: true };

    default:
      return state;
  }
};

export default ThueXeReducer;
