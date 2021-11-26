import _ from "lodash";
import types from "./NhanVienTypes";

const initialState = {
  isLoading: false,
  nhanVienkts: [],
  nhanVienkt: {},
};

const NhanVienReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_NHAN_VIEN:
      return { ...state, isLoading: true };

    case types.GET_ALL_NHAN_VIEN:
      return { ...state, nhanVienkts: action.nhanVienkts, isLoading: false };

    case types.UPDATE_NHAN_VIEN:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default NhanVienReducer;
