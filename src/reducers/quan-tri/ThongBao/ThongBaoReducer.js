import _ from "lodash";
import types from "./ThongBaoTypes";

const initialState = {
  isLoading: false,
  thongBaos: [],
  satHachs: [],
  khoaHocs: [],
  thongBaoTC: [],
  thongBao: {},
  appbar:[]
};

/**
 * set state for ThongBaoReducer
 * @param {*} state 
 * @param {*} action 
 * @returns new state and action
 */
const ThongBaoReducer = (state = initialState, action) => {
  switch (action.type) {
    // when loading data thong bao, return new state and action is loading true
    case types.SET_LOADING_THONG_BAO:
      return { ...state, isLoading: true };

    // when create new thong bao, return new state and action is loading false 
    case types.CREATE_THONG_BAO:
      return { ...state, isLoading: false };

    // when get all data thong bao, return new state and action is data from 
    // rootReducer, loading true
    case types.GET_ALL_THONG_BAO:
      return { ...state, thongBaos: action.thongBaos, isLoading: false };

    // when get data thong bao by id, return new state and action is data from 
    // rootReducer, loading false
    case types.GET_BY_ID_THONG_BAO:
      return { ...state, thongBao: action.thongBao, isLoading: false };

    // when create update thong bao, return new state and action is loading false
    case types.UPDATE_THONG_BAO:
      return { ...state, isLoading: false };

    // when get data thong bao to count show in Appbar.js, return new state and action is loading false
    case types.GET_THONG_BAO_TC:
      return { ...state, thongBaoTC: action.payload };

    // when show combobox of sat hach, return new state and action is loading false
    case types.GET_COMBOBOX_SAT_HACH:
      return { ...state, satHachs: action.satHachs, isLoading: false };

    // when show combobox of khoa hoc, return new state and action is loading false
    case types.GET_COMBOBOX_KHOA_HOC:
      return { ...state, khoaHocs: action.khoaHocs, isLoading: false };

      case types.INACTIVE_NOTIFICATION_APPBAR:
        return { ...state, appbar: action.appbar, isLoading: false };

    default:
      return state;
  }
};

export default ThongBaoReducer;
