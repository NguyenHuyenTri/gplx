import _ from "lodash";
import types from "./HangDaoTaoTypes";

const initialState = {
  isLoading: false,
  hangdaotaos: [],
  comboboxHDT: [],
  hangdaotao: {}
};

const HangDaoTaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_HANGDAOTAO:
      return { ...state, isLoading: true };

    case types.CREATE_HANGDAOTAO:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_HANGDAOTAO:
      return { ...state, hangdaotaos: action.hangdaotaos, isLoading: false };

    case types.GET_COMBOBOX_HANGDAOTAO:
      return { ...state, comboboxHDT: action.comboboxHDT, isLoading: false };

    case types.GET_BY_ID_HANGDAOTAO:
      return { ...state, hangdaotao: action.hangdaotao, isLoading: false };

    case types.UPDATE_HANGDAOTAO:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default HangDaoTaoReducer;
