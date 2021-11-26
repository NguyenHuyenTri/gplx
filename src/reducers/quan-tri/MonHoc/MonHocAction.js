import types from "./MonHocTypes";
import axios from "axios";

export const setLoadings = (payload) => ({
  type: types.SET_LOADING_MON_HOC,
  payload,
});

/**
 * create MonHoc
 * @param {*} form
 * @returns
 */
export const createMonHocRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch(setLoadings({ monHoc: true }));

    try {
      const response = axios.post("quantri/monhoc", form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.CREATE_MON_HOC,
        });
      }
      // setLoadings false
      dispatch(setLoadings({ monHoc: false }));
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Get MON_HOC Request
 * @returns
 */
export const GetMonHocRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_MON_HOC,
    });

    try {
      const response = await axios.get("quantri/monhoc");
      const resData = await response.data;
      
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_ALL_MON_HOC,
        monHocs: resData.monHocs,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get MON_HOC By Id
 * @param {*} id
 * @returns
 */
export const getMonHocByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_MON_HOC,
    });

    try {
      const response = await axios.get(`quantri/monhoc/detail/${id}`);
      const resData = await response.data;
      if (resData !== 200) {

      }
      dispatch({
        type: types.GET_BY_ID_MON_HOC,
        monHoc: resData.monHoc,
      });
    } catch (error) {
      throw error;
    }
  };
};


/**
 * updateMON_HOC
 * @param {*} form
 * @param {*} id
 * @returns
 */
export const updateMonHocRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_MON_HOC,
    });

    try {
      const response = axios.put(`quantri/monhoc/${id}`, form);
      const resData = await response;
      if (resData.status) {
        dispatch({
          type: types.UPDATE_MON_HOC,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**
 * delete MON_HOC Request
 * @param {*} id
 * @returns
 */

export const deleteMonHocRequest = (id) => async (dispatch) => {
  try {
    dispatch(setLoadings({ monHoc: true }));
    const response = axios.delete(`quantri/monhoc/${id}`);
    const resData = await response;

    if (resData) {
      dispatch(GetMonHocRequest());
    }

    dispatch(setLoadings({ monHoc: false }));
  } catch (e) {
    console.error(e);
    dispatch(setLoadings({ monHoc: false }));
  }
};
