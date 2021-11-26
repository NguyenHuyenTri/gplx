import _ from "lodash";
import types from "./HangGPLXTypes";

const initialState = {
  isLoading: false,
  hanggplxs: [],
  hanggplx: {}
};

const HangGPLXReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_HANG_GPLX:
      return { ...state, isLoading: true };

    case types.CREATE_HANG_GPLX:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_HANG_GPLX:
      return { ...state, hanggplxs: action.hanggplxs, isLoading: false };

    case types.GET_BY_ID_HANG_GPLX:
      return { ...state, hanggplx: action.hanggplx, isLoading: false };

    case types.UPDATE_HANG_GPLX:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default HangGPLXReducer;
