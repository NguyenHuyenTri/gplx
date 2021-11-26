import _ from "lodash";
import types from "./DTHVTypes";

const initialState = {
  loading: false,
  hocViens: [],
  khoaHoc: {},
  quocTichs: [],
  hocVien:{}
};

const GTHVReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LOADING:
      return { ...state, loading: { ...state.loading, ...action.payload } };

    case types.CREATE_HOC_VIEN:
      return { ...state, isLoading: true };

    case types.GET_KHOA_HOC:
      return { ...state, khoaHoc: action.payload };

    case types.GET_HOC_VIEN:
      return { ...state, hocViens: action.payload };

    case types.GET_QUOC_TICH:
      return { ...state, quocTichs: action.quocTichs, loading: false };
      case types.GET_BY_ID_HV:
        return { ...state, hocVien: action.hocVien, isLoading: false };

    default:
      return state;
  }
};

export default GTHVReducer;
