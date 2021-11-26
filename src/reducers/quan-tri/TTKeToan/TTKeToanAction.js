import types from "./TTKeToanTypes";
import axios from "axios";

export const setLoadings = (payload) => ({
  type: types.SET_LOADING_TT_KE_TOAN,
  payload,
});

/**
 * create TTKeToan
 * @param {*} form
 * @returns
 */
export const createTTKeToanRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch(setLoadings({ thongTinKT: true }));

    try {
      const response = axios.post("quantri/ketoan", form);
      const resData = await response;
      if (resData.status) {
        dispatch({
          type: types.CREATE_TT_KE_TOAN,
        });
      }
      // setLoadings false
      dispatch(setLoadings({ thongTinKT: false }));
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Get TTKeToanGV Request
 * @returns
 */
 export const GetTTKeToanGiaoVienRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_TT_KE_TOAN,
    });

    try {
      const response = await axios.get("quantri/ketoan/giaovien");
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_ALL_TT_KE_TOAN_GV,
        thongTinKTGVs: resData.thongTinKTs,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Get TTKeToanNV Request
 * @returns
 */
 export const GetTTKeToanNhanVienRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_TT_KE_TOAN,
    });

    try {
      const response = await axios.get("quantri/ketoan/nhanvien");
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_ALL_TT_KE_TOAN_NV,
        thongTinKTNVs: resData.thongTinKTs,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get TTKeToan By Id
 * @param {*} id
 * @returns
 */
export const getTTKeToanByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_TT_KE_TOAN,
    });
    try {
      const response = await axios.get(`quantri/ketoan/${id}`);
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_BY_ID_TT_KE_TOAN,
        thongTinKT: resData.keToan,
      });
    } catch (error) {
      throw error;
    }
  };
};


/**
 * update TTKeToan
 * @param {*} form
 * @param {*} id
 * @returns
 */
export const updateTTKeToanRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_TT_KE_TOAN,
    });
    try {
      const response = axios.put(`quantri/ketoan/${id}`, form);
      const resData = await response;
      if (resData.status) {
        dispatch({
          type: types.UPDATE_TT_KE_TOAN,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**
 * delete TTKeToan Request
 * @param {*} id
 * @returns
 */

export const deleteTTKeToanRequest = (id) => async (dispatch) => {
  try {
    dispatch(setLoadings({ thongTinKT: true }));
    const response = axios.delete(`quantri/ketoan/${id}`);
    const resData = await response;

    if (resData) {
      dispatch(GetTTKeToanGiaoVienRequest());
      dispatch(GetTTKeToanNhanVienRequest());
    }

    dispatch(setLoadings({ thongTinKT: false }));
  } catch (e) {
    console.error(e);
    dispatch(setLoadings({ thongTinKT: false }));
  }
};
