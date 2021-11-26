import _ from "lodash";
import types from "./KetQuaSatHachTypes";

const initialState = {
  isLoading: false,
  combobox: [],
  ketquasathachs: [],
  ketquasathach: {},
  diemLyThuyet: {}
};

const KetQuaSatHachReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_KETQUASATHACH:
      return { ...state, isLoading: true };

    case types.CREATE_KETQUASATHACH:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_KETQUASATHACH:
      return { ...state, ketquasathachs: action.ketquasathachs, isLoading: false };

    case types.GET_COMBOBOX_KYSATHACH:
      return { ...state, combobox: action.combobox, isLoading: false };

    case types.GET_BY_ID_KETQUASATHACH:
      return { ...state, ketquasathachs: action.ketquasathachs, isLoading: false };

    case types.GET_ID_DIEMLYTHUYET_SATHACH:
      return { ...state, diemLyThuyet: action.diemLyThuyet, isLoading: false };

    case types.UPDATE_KETQUASATHACH:
      return {
        ...state,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default KetQuaSatHachReducer;
