import types from "./DonViVanTaiTypes";
import axios from "axios";

/**                                                                                                      
 * create DonViVanTai Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */
export const createDonViVanTaiRequest = (form) => {
  return async (dispatch) => {
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvivantai: true, });

    try {
      const response = axios.post("quantri/dvgtvt", form);
      const resData = await response;

      if (resData.status) {
        dispatch({
          type: types.CREATE_DONVIVANTAI,
        });
      }
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvivantai: true, });
    } catch (error) {
      throw error;
    }
  };
};

export const resetData = (form) => {
  return async (dispatch) => {
    // setLoadings true                                                                                  
    dispatch({ type: types.GET_RESET_ID_DONVIVANTAI, donvivantai: true, });
  };
};

/**                                                                                                      
 * Get all DonViHanhChinh Request                                                                      
 * @returns                                                                                              
 */
export const GetAllDonViVanTai = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvihanhchinh: false, });

    try {
      const response = await axios.get("quantri/dvgtvt");
      const resData = await response.data;
      if (resData.dvgtvts !== null) {
        dispatch({
          type: types.GET_ALL_DONVIVANTAI,
          donvivantais: resData.dvgtvts,
        });
      }

    } catch (error) {
      throw error;
    }
  };
};


/**                                                                                                      
 * Get all DonViHanhChinh Request                                                                      
 * @returns                                                                                              
 */
export const GetAllComboboxDonViVanTai = () => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvihanhchinh: false, });

    try {
      const response = await axios.get("quantri/loaidvgtvt");
      const resData = await response.data;
      if (resData.loaiDVGTVTs !== null) {
        dispatch({
          type: types.GET_ALL_COMBOBOX_DONVIVANTAI,
          donvicombobox: resData.loaiDVGTVTs,
        });
      }
    
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * get DonViVanTai By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const getDonViVanTaiByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvivantai: false, });

    try {
      // call get DonViVanTai by id                                                                 
      const response = await axios.get(`quantri/dvgtvt/${id}`);
      const resData = await response.data;
      if (resData.dvgtvt!==null) {
      dispatch({ type: types.GET_BY_ID_DONVIVANTAI, donvivantai: resData.dvgtvt });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * update DonViVanTai Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const updateDonViVanTaiRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvivantai: false, });

    try {
      // call update DonViVanTai                                                                    
      const response = axios.put(`quantri/dvgtvt/${id}`, form);
      const resData = await response;

      if (resData.status) {
        // update status when update                                                                     
        dispatch({
          type: types.UPDATE_DONVIVANTAI,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * delete DonViVanTai Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
export const deleteDonViVanTaiRequest = (id) => async (dispatch) => {
  try {
    dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvivantai: true, });

    // call delete DonViVanTai                                                                      
    const response = axios.delete(`quantri/dvgtvt/${id}`);
    const resData = await response;

    if (resData) {
      // call load data after delete                                                                     
      dispatch(GetAllDonViVanTai());
    }

    dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvivantai: false, });
  } catch (e) {
    dispatch({ type: types.SET_LOADING_DONVIVANTAI, donvivantai: false, });
  }
};
