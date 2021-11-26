import types from './ThueXeTypes';
import axios from 'axios';

/**
 * create ThueXe Request
 * @param {*} form
 * @returns
 */
export const createThueXeRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.SET_LOADING_THUE_XE, xe: true });

    try {
      const response = axios.post('quantri/xe', form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.CREATE_THUE_XE,
        });
      }
      // setLoadings false
      dispatch({ type: types.SET_LOADING_THUE_XE, xe: true });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Get all ThueXe Request
 * @returns
 */
export const GetAllThueXeRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THUE_XE });

    try {
      const response = await axios.get('quantri/xe');
      const resData = await response.data;
      if (resData !== 200) {
      }

      dispatch({
        type: types.GET_ALL_THUE_XE,
        xes: resData.xes,
      });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * get ThueXe By Id
 * @param {*} id
 * @returns
 */
export const getThueXeByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THUE_XE, xe: false });

    try {
      // call get ThueXe by id
      const response = await axios.get(`quantri/xe/${id}`);
      const resData = await response.data;

      dispatch({ type: types.GET_BY_ID_THUE_XE, xe: resData.xe });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * update ThueXe Request
 * @param {*} form
 * @param {*} id
 * @returns
 */
export const updateThueXeRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_THUE_XE, xe: false });

    try {
      // call update ThueXe
      const response = axios.put(`quantri/xe/${id}`, form);
      const resData = await response;

      if (resData.status) {
        // update status when update
        dispatch({
          type: types.UPDATE_THUE_XE,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**
 * delete ThueXe Request
 * @param {*} id
 * @returns
 */
export const deleteThueXeRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_THUE_XE, xe: true });

    // call delete ThueXe
    const response = axios.delete(`quantri/xe/${id}`);
    const resData = await response;

    if (resData) {
      // call load data after delete
      dispatch(GetAllThueXeRequest());
    }

    dispatch({ type: types.SET_LOADING_THUE_XE, xe: false });
  } catch (e) {
    console.error(e);
    dispatch({ type: types.SET_LOADING_THUE_XE, xe: false });
  }
};
