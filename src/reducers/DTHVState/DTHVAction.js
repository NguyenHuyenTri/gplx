import types from './DTHVTypes';
import { getKhoaHoc, getHocVien } from '../../api/dao-tao-api';
import axios from 'axios';

export const setLoadings = (payload) => ({ type: types.SET_LOADING, payload });

export const setKhoaHoc = (payload) => ({ type: types.GET_KHOA_HOC, payload });

export const setHocVien = (payload) => ({ type: types.GET_HOC_VIEN, payload });


/**
 * create HV
 * @param {*} form
 * @returns
 */
 export const createHVRquest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING, xe: true });

    try {
      const response = axios.post("daotao/hocvien", form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.CREATE_HOC_VIEN,
        });
      }
      // setLoadings false
      dispatch({ type: types.LOADING, xe: true });
    } catch (error) {
      throw error;
    }
  };
};


/**
 * getKhoaHocRequest
 * @returns 
 */
export const getKhoaHocRequest = () => async (dispatch) => {
  try {
    dispatch(setLoadings({ khoahoc: true }));

    const res = await getKhoaHoc();

    if (res) {
      dispatch(setKhoaHoc(res));
    }
    dispatch(setLoadings({ khoahoc: false }));
  } catch (e) {
    console.error(e);
    dispatch(setLoadings({ khoahoc: false }));
  }
};

/**
 * getHocVienRequest
 * @param {*} idKhoaHoc 
 * @returns 
 */
export const getHocVienRequest = (idKhoaHoc) => async (dispatch) => {
  try {
    dispatch(setLoadings({ hocvien: true }));
    const res = await getHocVien(idKhoaHoc);
    if (res) {
      dispatch(setHocVien(res));
    }
    dispatch(setLoadings({ hocvien: false }));
  } catch (e) {
    console.error(e);
    dispatch(setLoadings({ hocvien: false }));
  }
};
/**
 * getQuocTichRequest
 * @returns 
 */
 export const GetQuocTichRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING, xe: false });
    try {
      const response = await axios.get("quoctich");
      const resData = await response.data;
      if (resData !== 200) {
      }

      dispatch({
        type: types.GET_QUOC_TICH,
        quocTichs: resData.quocTichs,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get Xe By Id
 * @param {*} id
 * @returns
 */
 export const getHVByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING, xe: false });

    try {
      const response = await axios.get(`daotao/hocvien/${id}`);
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_BY_ID_HV,
        hocVien: resData.hocVien,
      });
    } catch (error) {
      throw error;
    }
  };
};

