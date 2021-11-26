import _ from "lodash";
import types from "./MonHocTypes";

const initialState = {
  isLoading: false,
  monHocs: [],
  monHoc: {},
};

const MonHocReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_MON_HOC:
      return { ...state, isLoading: true };

    case types.CREATE_MON_HOC:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_MON_HOC:
      return { ...state, monHocs: action.monHocs, isLoading: false };

    case types.GET_BY_ID_MON_HOC:
      return { ...state, monHoc: action.monHoc, isLoading: false };

    case types.UPDATE_MON_HOC:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default MonHocReducer;
