import types from "./HangGPLXTypes";
import axios from "axios";

/**                                                                                                      
 * create HangGPLX Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */
export const createHangGPLXRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_HANG_GPLX, hanggplx: true, });

    try {
      const response = axios.post("quantri/hanggplx", form);
      const resData = await response;
      if (resData.status) {
        dispatch({
          type: types.CREATE_HANG_GPLX,
        });
      }
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_HANG_GPLX, hanggplx: true, });
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * Get all HangGPLX Request                                                                      
 * @returns                                                                                              
 */
export const GetAllHangGPLXRequest = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_HANG_GPLX, hanggplx: true, });

    try {
      const response = await axios.get("quantri/hanggplx");
      const resData = await response;
      if (resData.status) {
        dispatch({
          type: types.GET_ALL_HANG_GPLX,
          hanggplxs: resData.data.hangGPLXs,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * get HangGPLX By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const getHangGPLXByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_HANG_GPLX, hanggplx: false, });

    try {
      // call get HangGPLX by id                                                                 
      const response = await axios.get(`quantri/hanggplx/${id}`);

      const resData = await response;
      if (resData.status) {
        dispatch({
          type: types.GET_BY_ID_HANG_GPLX,
          hanggplx: resData.data.hangGPLX,
        });
      }


    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * update HangGPLX Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const updateHangGPLXRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_HANG_GPLX, hanggplx: false, });

    try {
      // call update HangGPLX                                                                    
      const response = axios.put(`quantri/hanggplx/${id}`, form);
      const resData = await response;

      if (resData.status) {
        // update status when update                                                                     
        dispatch({
          type: types.UPDATE_HANG_GPLX,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * delete HangGPLX Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const deleteHangGPLXRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_HANG_GPLX, hanggplx: true, });

    // call delete HangGPLX                                                                      
    const response = axios.delete(`quantri/hanggplx/${id}`);
    const resData = await response;
    if (resData.status==200) {                                                                       
      dispatch(GetAllHangGPLXRequest());
    }

    dispatch({ type: types.SET_LOADING_HANG_GPLX, hanggplx: false, });
  } catch (e) {
    dispatch({ type: types.SET_LOADING_HANG_GPLX, hanggplx: false, });
  }
};
