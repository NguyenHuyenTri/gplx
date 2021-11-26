import types from './XeTypes';
import axios from 'axios';
import fileDownload from 'js-file-download';

/**
 * create xe
 * @param {*} form
 * @returns
 */
export const createXeRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_XE, xe: true });

    try {
      const response = axios.post('xe', form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.CREATE_XE,
        });
      }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_XE, xe: true });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Get Xe Request
 * @returns
 */
export const GetXeRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_XE, xe: false });
    try {
      const response = await axios.get('xe');
      const resData = await response.data;
      if (resData !== 200) {
      }

      dispatch({
        type: types.GET_ALL_XE,
        xes: resData.xes,
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
export const getXeByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_XE, xe: false });

    try {
      const response = await axios.get(`xe/${id}`);
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_BY_ID_XE,
        xe: resData.xe,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get loai xe
 * @param {*} id
 * @returns
 */
export const getLoaiXeRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_XE, xe: false });

    try {
      const response = await axios.get('loaiXe');
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_LOAI_XE,
        loaiXes: resData.loaiXes,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get giáo viên
 * @param {*} id
 * @returns
 */
export const getGVRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_XE, xe: false });

    try {
      const response = await axios.get('giaovien');
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_GIAO_VIEN,
        giaoViens: resData.giaoViens,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get loai nhien lieu
 * @param {*} id
 * @returns
 */
export const getLoaiNhienLieuRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_XE, xe: false });

    try {
      const response = await axios.get('loainhienlieu');
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({
        type: types.GET_LOAI_NHIEN_LIEU,
        loaiNLs: resData.loaiNLs,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * updateXE
 * @param {*} form
 * @param {*} id
 * @returns
 */
export const updateXeRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_XE, xe: false });

    try {
      const response = axios.put(`xe/${id}`, form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.UPDATE_XE,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**
 * delete Xe Request
 * @param {*} id
 * @returns
 */

export const deleteXeRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_XE, xe: true });

    const response = axios.delete(`xe/${id}`);
    const resData = await response;

    if (resData) {
      dispatch(GetXeRequest());
    }

    dispatch({ type: types.SET_LOADING_XE, xe: false });
  } catch (e) {
    console.error(e);
    dispatch({ type: types.SET_LOADING_XE, xe: false });
  }
};

/**
 * export xe
 * @param {*} form
 * @returns
 */
export const exportXeRequest = (listId) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_XE, xe: true });

    try {
      axios({
        url: 'http://14.241.134.20:8081/api/xe/export',
        method: 'POST',
        data: {
          listXe: listId,
        },
        responseType: 'blob', // Important
      }).then((response) => {
        console.log(response);
        fileDownload(response.data, 'DSXe.xlsx');
      });
      // if (resData.status) {
      //   dispatch({
      //     type: types.EXPORT_XE,
      //   });
      // }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_XE, xe: true });
    } catch (error) {
      throw error;
    }
  };
};
