import _ from 'lodash';
import types from './GPLXTypes';

const initialState = {
  loading: {},
  hocVien: {},
  khoaHoc: {},
};

const GTHVReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.LOADING:
      return { ...state, loading: { ...state.loading, ...action.payload } };

    case types.GET_KHOA_HOC:
      return { ...state, khoaHoc: action.payload };

    case types.GET_HOC_VIEN:
      return { ...state, hocVien: action.payload };

    default:
      return state;
  }
};

export default GTHVReducer;
