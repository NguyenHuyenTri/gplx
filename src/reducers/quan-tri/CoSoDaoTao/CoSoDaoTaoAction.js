import types from "./CoSoDaoTaoTypes";                                                           
import axios from "axios";                                                                             
																										 
/**                                                                                                      
 * create CoSoDaoTao Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
export const createCoSoDaoTaoRequest = (form) => {                                                 
  return async (dispatch) => {                                                                           
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_COSODAOTAO, cosodaotao: true, });              
																										 
    try {                                                                                                
      const response = axios.post("csdt", form);                                         
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_COSODAOTAO,                                                      
        });                                                                                              
      }                                                                                                  
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_COSODAOTAO, cosodaotao: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * Get all CoSoDaoTao Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllCoSoDaoTaoRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_COSODAOTAO, cosodaotao: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/csdt");                                          
      const resData = await response.data;                                                               
      if (resData.csdt !==null) {  
        dispatch({                                                                                         
          type: types.GET_ALL_COSODAOTAO,                                                       
          cosodaotaos: resData.csdt,                                                               
        });   
      }  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * get CoSoDaoTao By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const getCoSoDaoTaoByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_COSODAOTAO, cosodaotao: false, });             
																										 
    try {                                                                                                
      // call get CoSoDaoTao by id                                                                 
      const response = await axios.get(`cosodaotao/${id}`);                                      
																										 
      dispatch({ type: types.GET_BY_ID_COSODAOTAO, car: response.data.cosodaotao });  
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * update CoSoDaoTao Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateCoSoDaoTaoRequest = (form) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_COSODAOTAO, cosodaotao: false, });             
																										 
    try {                                                                                                
      // call update CoSoDaoTao                                                                    
      const response = axios.put(`quantri/csdt`, form);                              
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_COSODAOTAO,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete CoSoDaoTao Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const deleteCoSoDaoTaoRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_COSODAOTAO, cosodaotao: true, });              
																										 
    // call delete CoSoDaoTao                                                                      
    const response = axios.delete(`cosodaotao/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      // call load data after delete                                                                     
      dispatch(GetAllCoSoDaoTaoRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_COSODAOTAO, cosodaotao: false, });             
  } catch (e) {                                                                                          
    dispatch({ type: types.SET_LOADING_COSODAOTAO, cosodaotao: false, });             
  }                                                                                                      
};                                                                                                       
