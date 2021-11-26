import types from './ThueXeTypes';
import axios from 'axios';
import { getLichThueXeById } from '../../../api/thue-xe-api';

export const getThueXeRequest = (id) => {
  return async (dispatch) => {
    // setLoadings true
    dispatch({ type: types.LOADING_THUE_XE, isLoading: true });

    try {
      const resData = await getLichThueXeById(id);

      if (resData) {
        dispatch({
          type: types.SET_THUE_XE,
          payload: resData,
        });
      }
      // setLoadings false
      dispatch({ type: types.LOADING_THUE_XE, isLoading: false });
    } catch (error) {
      dispatch({ type: types.LOADING_THUE_XE, isLoading: false });
      throw error;
    }
  };
};
