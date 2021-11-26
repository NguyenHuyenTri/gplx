import _ from "lodash";
import types from "./TTKeToanTypes";

const initialState = {
  isLoading: false,
  thongTinKTNVs: [],
  thongTinKTGVs: [],
  thongTinKT: {},
};

const TTKeToanReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_TT_KE_TOAN:
      return { ...state, isLoading: true };

    case types.CREATE_TT_KE_TOAN:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_TT_KE_TOAN_GV:
      return { ...state, thongTinKTGVs: action.thongTinKTGVs, isLoading: false };

    case types.GET_ALL_TT_KE_TOAN_NV:
      return { ...state, thongTinKTNVs: action.thongTinKTNVs, isLoading: false };

    case types.GET_BY_ID_TT_KE_TOAN:
      return { ...state, thongTinKT: action.thongTinKT, isLoading: false };

    case types.UPDATE_TT_KE_TOAN:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default TTKeToanReducer;
