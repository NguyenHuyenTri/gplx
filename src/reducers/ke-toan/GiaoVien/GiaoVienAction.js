import types from "./GiaoVienTypes";
import axios from "axios";
import fileDownload from "js-file-download";

export const setLoadings = (payload) => ({
  type: types.SET_LOADING_GIAO_VIEN,
  payload,
});


/**
 * Get GiaoVien Request
 * @returns
 */
export const GetGiaoVienRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_GIAO_VIEN,
    });

    try {
      const response = await axios.get("ketoan/giaovien");
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_ALL_GIAO_VIEN,
        giaoVienkts: resData.giaoViens,
      });
    } catch (error) {
      throw error;
    }
  };
};


/**
 * update giao vien ke toan
 * @param {*} form
 * @param {*} id
 * @returns
 */
 export const updateGiaoVienRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVienkts: true });

    try {
      const response = axios.put("ketoan/giaovien", form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.UPDATE_GIAO_VIEN,
        });
      }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVienkts: true });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * export GIAO_VIEN
 * @param {*} form
 * @returns
 */
 export const exportGVRequest = () => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVienkts: true });

    try {
      axios({
        url: 'http://14.241.134.20:8081/api/ketoan/giaovien/export',
        method: 'POST',
       
        responseType: 'blob', // Important
      }).then((response) => {
          fileDownload(response.data, 'giaoVienKetoan.xlsx');
      });
      // if (resData.status) {
      //   dispatch({
      //     type: types.EXPORT_XE,
      //   });
      // }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_GIAO_VIEN, giaoVienkts: true });
    } catch (error) {
      throw error;
    }
  };
};


