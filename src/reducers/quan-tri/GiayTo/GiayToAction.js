import types from "./GiayToTypes";
import axios from "axios";

/**                                                                                                      
 * create Giayto Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */
export const createGiayToRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_GIAY_TO, giayTo: true, });

    try {
      const response = axios.post("quantri/giayto", form);
      const resData = await response;

      // check status true or false
      if (resData.status) {
        dispatch({
          type: types.CREATE_GIAY_TO,
        });
      }
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_GIAY_TO, giayTo: true, });
    } catch (error) {
      throw error;
    }
  };
};

/**
 * Get Giay To Request
 * @returns
 */
export const GetAllGiayToRequest = () => {
  return async (dispatch) => {
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_GIAY_TO });

    try {
      const response = await axios.get("quantri/giayto");
      const resData = await response.data;

      if (resData !== 200) {
      }

      dispatch({
        type: types.GET_ALL_GIAY_TO,
        giayTos: resData.giayTos,
      });
    } catch (error) {
      throw error;
    }
  };
};


/**                                                                                                      
 * get Giayto By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const getGiayToByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_GIAY_TO, giayTo: false, });

    try {
      // call get Giayto by id                                                                 
      const response = await axios.get(`quantri/giayto/${id}`);
      const resData = await response.data;
      if (resData !== 200) {
      }
      dispatch({ type: types.GET_BY_ID_GIAY_TO, giayTo: resData.giayTo });

    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * update Giayto Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const updateGiaytoRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_GIAY_TO, giayTo: false, });

    try {
      // call update Giayto                                                                    
      const response = axios.put(`quantri/giayto/${id}`, form);
      const resData = await response;

      if (resData.status) {
        // update status when update                                                                     
        dispatch({
          type: types.UPDATE_GIAY_TO,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * delete Giayto Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const deleteGiayToRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_GIAY_TO, giayTo: true, });

    // call delete Giayto                                                                      
    const response = axios.delete(`quantri/giayto/${id}`);
    const resData = await response;

    if (resData) {
      // call load data after delete                                                                     
      dispatch(GetAllGiayToRequest());
    }

    dispatch({ type: types.SET_LOADING_GIAY_TO, giayTo: false, });
  } catch (e) {
    console.error(e);
    dispatch({ type: types.SET_LOADING_GIAY_TO, giayTo: false, });
  }
};
