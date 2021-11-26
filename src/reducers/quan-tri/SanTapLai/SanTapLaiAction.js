import types from "./SanTapLaiTypes";                                                           
import axios from "axios";                                                                             
																										 
/**                                                                                                      
 * create SanTapLai Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
export const createSanTapLaiRequest = (form) => {                                                 
  return async (dispatch) => {                                                                           
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_SAN_TAP_LAI, sanTL: true, });              
																										 
    try {                                                                                                
      const response = axios.post("quantri/santaplai", form);                                         
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_SAN_TAP_LAI,                                                      
        });                                                                                              
      }                                                                                                  
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_SAN_TAP_LAI, sanTL: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * Get all SanTapLai Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllSanTapLaiRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_SAN_TAP_LAI });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/santaplai");                                          
      const resData = await response.data;    

      if (resData !== 200) {  
      }                                                                                                  
																										 
      dispatch({                                                                                         
        type: types.GET_ALL_SAN_TAP_LAI,                                                       
        sanTLs: resData.sanTLs,                                                               
      });                                                                                                
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * get SanTapLai By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const getSanTapLaiByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_SAN_TAP_LAI, sanTL: false, });             
																										 
    try {                                                                                                
      // call get SanTapLai by id                                                                 
      const response = await axios.get(`quantri/santaplai/${id}`);                                      
			const resData = await response.data;
      if (resData !== 200) {
      }
																					 
      dispatch({ type: types.GET_BY_ID_SAN_TAP_LAI, sanTL: resData.sanTL });  
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * update SanTapLai Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateSanTapLaiRequest = (form, id) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_SAN_TAP_LAI, sanTL: false, });             
																										 
    try {                                                                                                
      // call update SanTapLai                                                                    
      const response = axios.put(`quantri/santaplai/${id}`, form);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_SAN_TAP_LAI,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete SanTapLai Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const deleteSanTapLaiRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_SAN_TAP_LAI, sanTL: true, });              
																										 
    // call delete SanTapLai                                                                      
    const response = axios.delete(`quantri/santaplai/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      // call load data after delete                                                                     
      dispatch(GetAllSanTapLaiRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_SAN_TAP_LAI, sanTL: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_SAN_TAP_LAI, sanTL: false, });             
  }                                                                                                      
};                                                                                                       
