import _ from "lodash";
import types from "./PhanQuyenTypes";

const initialState = {
  isLoading: false,
  phanQuyens: [],
  phanQuyen: {},
  donVis: [],
  chucVus: [],
  nhomChucNangs: [],
};

const PhanQuyenReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_PHAN_QUYEN:
      return { ...state, isLoading: true };

    case types.CREATE_PHAN_QUYEN:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_PHAN_QUYEN:
      return { ...state, phanQuyens: action.phanQuyens, isLoading: false };

    case types.GET_BY_ID_PHAN_QUYEN:
      return { ...state, phanQuyen: action.phanQuyen, isLoading: false };

    case types.UPDATE_PHAN_QUYEN:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_COMBOBOX_DON_VI:
      return { ...state, donVis: action.donVis, isLoading: false };

    case types.GET_COMBOBOX_CHUC_VU:
      return { ...state, chucVus: action.chucVus, isLoading: false };

    case types.GET_NHOM_CHUC_NANG:
      return { ...state, nhomChucNangs: action.nhomChucNangs, isLoading: false };

    default:
      return state;
  }
};

export default PhanQuyenReducer;
