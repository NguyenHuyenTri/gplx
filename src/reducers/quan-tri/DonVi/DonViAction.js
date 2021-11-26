import types from "./DonViTypes";                                                           
import axios from "axios";                                                                             
																										 
/**                                                                                                      
 * create DonVi Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
export const createDonViRequest = (form) => {                                                 
  return async (dispatch) => {                                                                           
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_DON_VI, donVi: true, });              
																										 
    try {                                                                                                
      const response = axios.post("quantri/donvi", form);                                         
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_DON_VI,                                                      
        });                                                                                              
      }                                                                                                  
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_DON_VI, donVi: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * Get all DonVi Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetAllDonViRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DON_VI, donVi: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/donvi");                                          
      const resData = await response.data;   
                 
      if (resData !== 200) {                                                                             
      }                                                                                                  
																										 
      dispatch({                                                                                         
        type: types.GET_ALL_DON_VI,                                                       
        donVis: resData.donVis,                                                               
      });                                                                                                
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * get DonVi By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const getDonViByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DON_VI, donVi: false, });             
																										 
    try {                                                                                                
      // call get DonVi by id                                                                 
      const response = await axios.get(`quantri/donvi/${id}`);  
      const resData = response.data;                                    
																										 
      dispatch({ type: types.GET_BY_ID_DON_VI, donVi: resData.donVi });  
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * update DonVi Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateDonViRequest = (form, id) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DON_VI, donVi: false, });             
																										 
    try {                                                                                                
      // call update DonVi                                                                    
      const response = axios.put(`quantri/donvi/${id}`, form);                                      
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_DON_VI,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete DonVi Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const deleteDonViRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_DON_VI, donVi: true, });              
																										 
    // call delete DonVi                                                                      
    const response = axios.delete(`quantri/donvi/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      // call load data after delete                                                                     
      dispatch(GetAllDonViRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_DON_VI, donVi: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_DON_VI, donVi: false, });             
  }                                                                                                      
};                                                                                                       
