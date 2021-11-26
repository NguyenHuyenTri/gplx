import types from "./DonViHanhChinhTypes";                                                           
import axios from "axios";                                                                             
																										 
                                                                                                    
/**                                                                                                      
 * create DonViHanhChinh Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
 export const createDonViHanhChinhRequest = (form) => {                                                 
  return async (dispatch) => {                                                                           
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: true, });              
																										 
    try {                                                                                                
      const response = axios.post("quantri/dvhc", form);                                         
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_DONVIHANHCHINH,                                                      
        });                                                                                              
      }                                                                                                  
      // setLoadings false                                                                               
      dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};  
/**                                                                                                      
 * Get all Combobox DHVC Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
 export const GetAllComboboxDVHCRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/loaidvhc");                                          
      const resData = await response.data;                                                               
      if (resData.loaiDVHCs!==null) {
        dispatch({                                                                                         
          type: types.GET_ALL_COMBOBOX_DVHC,                                                       
          comboboxDHCV: resData.loaiDVHCs,                                                               
        });   
      }                                                                                                                                                                                                 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};  

/**                                                                                                      
 * Get DVHC id                                                                     
 * @returns                                                                                              
 */                                                                                                      
 export const GetIdDonViHanhChinh = (id) => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: false, });             
																										 
    try {                                                                                                
      const response = await axios.get(`quantri/dvhc/${id}`);                                          
      const resData = await response.data;  
      
      console.log(resData)

      if (resData.dvhc!==null) {       
        dispatch({                                                                                         
          type: types.GET_BY_ID_DONVIHANHCHINH,                                                       
          donvihanhchinh: resData.dvhc,                                                               
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
export const GetAllDonViHanhChinhRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/dvhc");                                          
      const resData = await response.data;                                                               
      if (resData.dvhcs!==null) {  
        dispatch({                                                                                         
          type: types.GET_ALL_DONVIHANHCHINH,                                                       
          donvihanhchinhs: resData.dvhcs,                                                               
        });                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
}; 
																										                                                                                                                                                                                                    
																										 
/**                                                                                                      
 * update DonViHanhChinh Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateDonViHanhChinhRequest = (form, id) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: false, });             
																										 
    try {                                                                                                
      const response = await axios.put(`quantri/dvhc/${id}` ,form);                                 
      const resData = await response.data;                                                               
   
      dispatch({                                                                                         
        type: types.UPDATE_DONVIHANHCHINH,                                                                                                                   
      });     
      
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete DonViHanhChinh Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const deleteDonViHanhChinhRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: true, });              
																										 
    // call delete DonViHanhChinh                                                                      
    const response = axios.delete(`quantri/dvhc/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      // call load data after delete                                                                     
      dispatch(GetAllDonViHanhChinhRequest());                                                         
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: false, });             
  } catch (e) {                                                                                          
    dispatch({ type: types.SET_LOADING_DONVIHANHCHINH, donvihanhchinh: false, });             
  }                                                                                                      
};                                                                                                       
