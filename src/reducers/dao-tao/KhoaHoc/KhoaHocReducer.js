import _ from "lodash";
import types from "./KhoaHocTypes";

const initialState = {
  isLoading: false,
  khoaHocs: [],
  khoaHoc: {},
  hangDTs: [],
  hangGPLXs: [],
};

const KhoaHocReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_KHOA_HOC:
      return { ...state, isLoading: true };

    case types.CREATE_KHOA_HOC:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_KHOA_HOC:
      return { ...state, khoaHocs: action.khoaHocs, isLoading: false };

    case types.GET_BY_ID_KHOA_HOC:
      return { ...state, khoaHoc: action.khoaHoc, isLoading: false };

    case types.UPDATE_KHOA_HOC:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_HANG_DAO_TAO:
      return { ...state, hangDTs: action.hangDTs, isLoading: false };

    case types.GET_HANG_GPLX:
      return { ...state, hangGPLXs: action.hangGPLXs, isLoading: false };

    default:
      return state;
  }
};

export default KhoaHocReducer;
