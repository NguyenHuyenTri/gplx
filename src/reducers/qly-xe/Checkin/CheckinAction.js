import types from "./CheckinTypes";                                                           
import axios from "axios";                                                                             
																					 
/**                                                                                                      
 * Get all Checkin Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllCheckinRequest = (id) => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_CHECKIN, checkin: false, });             
																										 
    try {                                                                                                
      const response = await axios.get(`thietbi/thethuexe/${id}`);                                            
      const resData = await response.data;   
                                                   
      if (resData.theTuRavaos!=null) { 
        dispatch({                                                                                         
          type: types.GET_ALL_CHECKIN,                                                       
          checkins: resData,                                                               
        });                                                                           
      }                                                                                                         
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
}; 

/**                                                                                                      
 * get checkin By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
 export const getCheckinByIdRequest = (id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_CHECKIN, checkin: false, });

    try {
      // call get checkin by id                                                                 
      const response = await axios.get(`thietbi/thethuexe/ravao/${id}`);

      const resData = await response;
      if (resData.status === 200) {
        dispatch({
          type: types.GET_BY_ID_CHECKIN,
          checkin: resData.data.theTuRavao,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};
																										                                                                                                     
/**                                                                                                      
 * update checkin Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */
 export const updateCheckinRequest = (form, id) => {
  return async (dispatch) => {
    dispatch({ type: types.SET_LOADING_CHECKIN, checkin: false, });

    try {
      // call update checkin                                                                    
      const response = axios.put(`thietbi/thethuexe/ravao/${id}`, form);
      const resData = await response;

      if (resData.status) {
        // update status when update                                                                     
        dispatch({
          type: types.UPDATE_CHECKIN,
        });
      }
    } catch (error) {
      throw error;
    }
  };
};

/**                                                                                                      
 * Get all xe cho thuê                                                                       
 * @returns                                                                                              
 */                                                                                                      
 export const GetAllXeRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_CHECKIN, checkin: false, });             
																										 
    try {                                                                                                
      const response = await axios.get(`xe/list`);                                            
      const resData = await response.data;   
                                                   
      if (resData.xes!=null) { 
        dispatch({                                                                                         
          type: types.GET_ALL_XE,                                                       
          xes: resData.xes,                                                               
        });                                                                           
      }                                                                                                         
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
}; 

/**                                                                                                      
 * Get all san tap lai                                                                       
 * @returns                                                                                              
 */                                                                                                      
 export const GetAllSanTapLaiRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_CHECKIN, checkin: false, });             
																										 
    try {                                                                                                
      const response = await axios.get(`santaplai`);                                            
      const resData = await response.data;   
                                                   
      if (resData.sanTLs!=null) { 
        dispatch({                                                                                         
          type: types.GET_ALL_SAN_TAP_LAI,                                                       
          sanTLs: resData.sanTLs,                                                               
        });                                                                           
      }                                                                                                         
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
}; 