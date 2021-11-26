import types from "./NhanVienTypes";
import axios from "axios";
import fileDownload from "js-file-download";

export const setLoadings = (payload) => ({
  type: types.SET_LOADING_NHAN_VIEN,
  payload,
});


/**
 * Get nhân Vien Request
 * @returns
 */
export const GetNhanVienRequest = () => {
  return async (dispatch) => {
    dispatch({
      type: types.SET_LOADING_NHAN_VIEN,
    });

    try {
      const response = await axios.get("ketoan/nhanvien");
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_ALL_NHAN_VIEN,
        nhanVienkts: resData.nhanViens,
      });
    } catch (error) {
      throw error;
    }
  };
};


/**
 * update nhan vien ke toan
 * @param {*} form
 * @param {*} id
 * @returns
 */
 export const updateNhanVienRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_NHAN_VIEN, nhanVienkts: true });

    try {
      const response = axios.put("ketoan/nhanvien", form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.UPDATE_NHAN_VIEN,
        });
      }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_NHAN_VIEN, nhanVienkts: true });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * export nhanVienkts_VIEN
 * @param {*} form
 * @returns
 */
 export const exportNVRequest = () => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_NHAN_VIEN, nhanVienkts: true });

    try {
      axios({
        url: 'http://14.241.134.20:8081/api/ketoan/nhanvien/export',
        method: 'POST',
       
        responseType: 'blob', // Important
      }).then((response) => {
          fileDownload(response.data, 'nhanVienKetoan.xlsx');
      });
      // if (resData.status) {
      //   dispatch({
      //     type: types.EXPORT_XE,
      //   });
      // }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_NHAN_VIEN, nhanVienkts: true });
    } catch (error) {
      throw error;
    }
  };
};


