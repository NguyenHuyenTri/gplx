import _ from "lodash";
import types from "./HangDaoTaoMonHocTypes";

const initialState = {
  isLoading: false,
  hangdaotaomonhocs: [],
  hangdaotaomonhoc: {},
  tenhangdaotaomonhoc: {},
  monHocs: [],
};

const HangDaoTaoMonHocReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_HANGDAOTAOMONHOC:
      return { ...state, isLoading: true };

    case types.CREATE_HANGDAOTAOMONHOC:
      return {
        ...state,
        isLoading: false,
      };
      
    case types.GET_ALL_HANGDAOTAOMONHOC:
      return {
        ...state,
        hangdaotaomonhocs: action.hangdaotaomonhocs,
        tenhangdaotaomonhoc: action.tenhangdaotaomonhoc,
        isLoading: false
      };
      
    case types.GET_ALL_MONHOC:
      return { ...state, monHocs: action.monHocs, isLoading: false };

    case types.GET_BY_ID_HANGDAOTAOMONHOC:
      return { ...state, hangdaotaomonhoc: action.hangdaotaomonhoc, isLoading: false };

    case types.UPDATE_HANGDAOTAOMONHOC:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default HangDaoTaoMonHocReducer;
