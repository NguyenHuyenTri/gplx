import _ from "lodash";
import types from "./KetQuaDaoTaoTypes";

const initialState = {
  isLoading: false,
  comboboxkhoahoc: [],
  ketquadaotaos: [],
  listchinhchi: [],
  ketquadaotao: {},
  listmonhoc: [],
  listmonhocdaotao: [],
};

const KetQuaDaoTaoReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_KETQUADAOTAO:
      return { ...state, isLoading: true };

    case types.CREATE_KETQUADAOTAO:
      return {
        ...state,
        isLoading: false,
      };

    case types.GET_ALL_COMBOBOX_KHOAHOC:
      return { ...state, comboboxkhoahoc: action.comboboxkhoahoc, isLoading: false };

    case types.GET_ALL_KETQUADAOTAO:
      return { ...state, ketquadaotaos: action.ketquadaotaos, isLoading: false };

    case types.GET_BY_ID_KETQUADAOTAO:
      return { ...state, ketquadaotaos: action.ketquadaotaos, isLoading: false };
    case types.GET_BY_ID_KETQUACHINHCHI:
      return { ...state, listchinhchi: action.listchinhchi, isLoading: false };
    case types.GET_LIST_MONHOC_DAOTAO:
      return {...state, listmonhocdaotao: action.listmonhocdaotao,
        isLoading: false
      };
    case types.GET_LIST_MONHOC:
      return {...state, listmonhoc: action.listmonhoc,
        isLoading: false
      };


    case types.UPDATE_KETQUADAOTAO:
      return {
        ...state,
        listchinhchi: action.listchinhchi,
        isLoading: false,
      };

    default:
      return state;
  }
};

export default KetQuaDaoTaoReducer;
