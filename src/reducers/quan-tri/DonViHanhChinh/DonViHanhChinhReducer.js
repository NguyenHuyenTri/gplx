import _ from "lodash";
import types from "./DonViHanhChinhTypes";

const initialState = {
  isLoading: false,
  comboboxDHCV: [],
  donvihanhchinhs: [],
  donvihanhchinh: {},
};

const DonViHanhChinhReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_DONVIHANHCHINH:
      return { ...state, isLoading: true };

    case types.CREATE_DONVIHANHCHINH:
      return {
        ...state,
        isLoading: false,
      };
    case types.GET_ALL_COMBOBOX_DVHC:
      return { ...state, comboboxDHCV: action.comboboxDHCV, isLoading: false };

    case types.GET_ALL_DONVIHANHCHINH:
      return { ...state, donvihanhchinhs: action.donvihanhchinhs, isLoading: false };


    case types.GET_BY_ID_DONVIHANHCHINH:
      return { ...state, donvihanhchinh: action.donvihanhchinh, isLoading: false };

    case types.UPDATE_DONVIHANHCHINH:
      return {
        ...state,
        isLoading: false,
      };

    case types.UPDATE_DONVIVANTAI:
      return {
        ...state,
        isLoading: false,
      };


    default:
      return state;
  }
};

export default DonViHanhChinhReducer;
