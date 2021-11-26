import types from './GPLXTypes';
import { getKhoaHoc, getHocVien } from '../../api/dao-tao-api';

export const setLoadings = (payload) => ({ type: types.SET_LOADING, payload });

export const setKhoaHoc = (payload) => ({ type: types.GET_KHOA_HOC, payload });

export const setHocVien = (payload) => ({ type: types.GET_HOC_VIEN, payload });

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
