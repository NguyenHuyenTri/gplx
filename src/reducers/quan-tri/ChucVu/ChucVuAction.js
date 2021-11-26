import types from "./ChucVuTypes";                                                           
import axios from "axios";                                                                             
																										 
/**                                                                                                      
 * create ChucVu Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
export const createChucVuRequest = (form) => {                                                 
  return async (dispatch) => {  
                                                                             
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_CHUC_VU, chucVu: true, });              																						 
    try {                                                                                                
      const response = axios.post("quantri/chucvu", form);                                 
      const resData = await response;                                                                    																						 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_CHUC_VU,                                                      
        });                                                                                              
      }                                                                                                  
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_CHUC_VU, chucVu: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * Get all ChucVu Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllChucVuRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_CHUC_VU, chucVu: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/chucvu");                                          
      const resData = await response.data;     

      if (resData !== 200) {                                                                             
      }                                                                                                  
																										 
      dispatch({                                                                                         
        type: types.GET_ALL_CHUC_VU,                                                       
        chucVus: resData.chucVus,                                                               
      });                                                                                                
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * get ChucVu By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const getChucVuByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_CHUC_VU, chucVu: false, });             
																										 
    try {                                                                                                
      // call get ChucVu by id                                                                 
      const response = await axios.get(`quantri/chucvu/${id}`);                                      
																										 
      dispatch({ type: types.GET_BY_ID_CHUC_VU, chucVu: response.data.chucVu });  
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * update ChucVu Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateChucVuRequest = (form, id) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_CHUC_VU, chucVu: false, });             
																										 
    try {                                                                                                
      // call update ChucVu                                                                    
      const response = axios.put(`quantri/chucvu/${id}`, form);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_CHUC_VU,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete ChucVu Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const deleteChucVuRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_CHUC_VU, chucVu: true, });              
																										 
    // call delete ChucVu                                                                      
    const response = axios.delete(`quantri/chucvu/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      // call load data after delete                                                                     
      dispatch(GetAllChucVuRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_CHUC_VU, chucVu: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_CHUC_VU, chucVu: false, });             
  }                                                                                                      
};                                                                                                       
