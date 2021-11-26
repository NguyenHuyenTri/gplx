import _ from "lodash";
import types from "./GiaoVienTypes";

const initialState = {
  isLoading: false,
  giaoVienkts: [],
  giaoVienkt: {},
};

const GiaoVienReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_GIAO_VIEN:
      return { ...state, isLoading: true };

    case types.GET_ALL_GIAO_VIEN:
      return { ...state, giaoVienkts: action.giaoVienkts, isLoading: false };

    case types.UPDATE_GIAO_VIEN:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default GiaoVienReducer;
