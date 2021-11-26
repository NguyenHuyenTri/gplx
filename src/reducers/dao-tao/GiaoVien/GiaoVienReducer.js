import _ from "lodash";
import types from "./GiaoVienTypes";

const initialState = {
  isLoading: false,
  giaoViens: [],
  giaoVien: {},
  hangGPLXs: [],
  noiCaps: [],
  hangGPLXGV: [],
};

const XeReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING_GIAO_VIEN:
      return { ...state, isLoading: true };

    case types.CREATE_GIAO_VIEN:
      return {
        ...state,
        isLoading: false,
      };

    case types.CREATE_GPLX_GV:
      return {
        ...state,
        hangGPLXGV: [...state.hangGPLXGV, action.hangGPLXGV],
        isLoading: false,
      };

    case types.UPDATE_VIEW_GPLX_GV:
      var temp = [];
      state.hangGPLXGV.forEach((item) => {
        if (item.id == action.hangGPLXGVNew.id) {
          temp.push(action.hangGPLXGVNew);
        } else {
          temp.push(item);
        }
      });

    case types.UPDATE_VIEW_GPLX_GV:
      var temp = [];
      state.hangGPLXGV.forEach((item) => {
        if (item.id == action.hangGPLXGVNew.id) {
          temp.push(action.hangGPLXGVNew);
        } else {
          temp.push(item);
        }
      });

      return {
        ...state,
        hangGPLXGV: [...temp],
        isLoading: false,
      };

    case types.CLEAR_GPLX_GV:
      return {
        ...state,
        hangGPLXGV: [],
        isLoading: false,
      };

    case types.GET_ALL_GIAO_VIEN:
      return { ...state, giaoViens: action.giaoViens, isLoading: false };

    case types.GET_NOI_CAP:
      return { ...state, noiCaps: action.noiCaps, isLoading: false };

    case types.GET_HANG_GPLX:
      return { ...state, hangGPLXs: action.hangGPLXs, isLoading: false };

    case types.GET_BY_ID_GIAO_VIEN:
      return { ...state, giaoVien: action.giaoVien, isLoading: false };

    case types.EXPORT_GIAO_VIEN:
      return {
        ...state,
        isLoading: false,
      };

    case types.UPDATE_GPLX_GV:
      return {
        ...state,
        isLoading: false,
      };
    case types.UPDATE_GV:
      return {
        ...state,
        isLoading: false,
      };
    default:
      return state;
  }
};

export default XeReducer;
