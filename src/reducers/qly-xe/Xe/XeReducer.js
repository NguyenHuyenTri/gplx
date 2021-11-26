import _ from "lodash";
import types from "./XeTypes";

const initialState = {
  isLoading: false,
  xes: [],
  xe: {},
  loaiXes: [],
  loaiNLs: [],
  giaoViens: [],
  listXe:[]
};

const XeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_XE:
      return { ...state, isLoading: true };

    case types.CREATE_XE:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_XE:
      return { ...state, xes: action.xes, isLoading: false };

    case types.GET_BY_ID_XE:
      return { ...state, xe: action.xe, isLoading: false };

    case types.GET_LOAI_XE:
      return { ...state, loaiXes: action.loaiXes, isLoading: false };

    case types.GET_LOAI_NHIEN_LIEU:
      return { ...state, loaiNLs: action.loaiNLs, isLoading: false };

    case types.GET_GIAO_VIEN:
      return { ...state, giaoViens: action.giaoViens, isLoading: false };

    case types.UPDATE_XE:
      return {
        ...state,
        isLoading: false,
      };

    case types.EXPORT_XE:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default XeReducer;
