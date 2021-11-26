import _ from "lodash";
import types from "./DonViVanTaiTypes";

const initialState = {
  isLoading: false,
  donvivantais: [],
  donvicombobox: [],
  donvivantai: {}
};

const DonViVanTaiReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_DONVIVANTAI:
      return { ...state, isLoading: true };

    case types.CREATE_DONVIVANTAI:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_DONVIVANTAI:
      return { ...state, donvivantais: action.donvivantais, isLoading: false };

    case types.GET_ALL_COMBOBOX_DONVIVANTAI:
      return { ...state, donvicombobox: action.donvicombobox, isLoading: false };

    case types.GET_BY_ID_DONVIVANTAI:
      return { ...state, donvivantai: action.donvivantai, isLoading: false };

    case types.GET_RESET_ID_DONVIVANTAI:
      return { ...state, donvivantai: {}, isLoading: false };

    case types.UPDATE_DONVIVANTAI:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default DonViVanTaiReducer;
