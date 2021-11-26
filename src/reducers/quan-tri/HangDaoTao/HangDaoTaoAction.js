import types from "./HangDaoTaoTypes";                                                           
import axios from "axios";                                                                             
																										 
/**                                                                                                      
 * create HangDaoTao Request                                                                       
 * @param {*} form                                                                                       
 * @returns                                                                                              
 */                                                                                                      
export const createHangDaoTaoRequest = (form) => {                                                 
  return async (dispatch) => {                                                                           
    // setLoadings true                                                                                  
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: true, });              
    try {                                                                                                
      const response = axios.post("quantri/hangdt", form);                                         
      const resData = await response;                                                                    
																										 
      if (resData.status) {                                                                              
        dispatch({                                                                                       
          type: types.CREATE_HANGDAOTAO,                                                      
        });                                                                                              
      }                                                                                                  
      dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: true, });            
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * Get all GetComboboxHangDaoTaoRequest Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
export const GetComboboxHangDaoTaoRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("hanggplx");                                          
      const resData = await response.data;                                                               
      if (resData.hangGPLXs !== null) {   
        dispatch({                                                                                         
          type: types.GET_COMBOBOX_HANGDAOTAO,                                                       
          comboboxHDT: resData.hangGPLXs,                                                            
        });                                                                            
      }                                                                                                  
                                                                                                 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};


/**                                                                                                      
 * Get all HangDaoTao Request                                                                      
 * @returns                                                                                              
 */                                                                                                      
 export const GetAllHangDaoTaoRequest = () => {                                                     
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: false, });             
																										 
    try {                                                                                                
      const response = await axios.get("quantri/hangdt");                                          
      const resData = await response.data;                                                               
      if (resData.hangDTs !== null) {    
        dispatch({                                                                                         
          type: types.GET_ALL_HANGDAOTAO,                                                       
          hangdaotaos: resData.hangDTs,                                                            
        });                                                                           
      }     
                                                                                                 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};
																										 
/**                                                                                                      
 * get HangGPLX DaoTao By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */  

export const getHangGPLXDaoTaoByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: false, });
    
    try {                                                                                                
      const response = await axios.get(`quantri/hangdt/hanggplx/${id}`);                                      
      const resData = await response.data; 
       dispatch({                                                                                         
        type: types.GET_ALL_HANGDAOTAO,                                                       
        hangdaotaos: resData.hangDTs,                                                            
      });     
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
}; 

/**                                                                                                      
 * get HangGPLX DaoTao By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */  

 export const ResetDaoTaoByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: false, });
    try {                                                                                                
       dispatch({                                                                                         
        type: types.GET_BY_ID_HANGDAOTAO,                                                       
        hangdaotao: {},                                                            
      });     
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
}; 

/**                                                                                                      
 * get HangDaoTao By Id                                                                            
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */ 
export const getHangDaoTaoByIdRequest = (id) => {                                                  
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: false, });
    
    try {                                                                                                
      const response = await axios.get(`quantri/hangdt/${id}`);                                      
      const resData = await response.data; 
       dispatch({                                                                                         
        type: types.GET_BY_ID_HANGDAOTAO,                                                       
        hangdaotao: resData.hangDT,                                                            
      });     
																										 
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};
																										 
/**                                                                                                      
 * update HangDaoTao Request                                                                       
 * @param {*} form                                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const updateHangDaoTaoRequest = (form, id) => {                                             
  return async (dispatch) => {                                                                           
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: true, });             
																										 
    try {                                                                                                
      // call update HangDaoTao                                                                    
      const response = axios.put(`quantri/hangdt/${id}`, form);                                      
      const resData = await response;                                                                    
      console.log(resData.status)
      if (resData.status) {                                                                              
        // update status when update                                                                     
        dispatch({                                                                                       
          type: types.UPDATE_HANGDAOTAO,                                                      
        });                                                                                              
      }                                                                                                  
    } catch (error) {                                                                                    
      throw error;                                                                                       
    }                                                                                                    
  };                                                                                                     
};                                                                                                       
																										 
/**                                                                                                      
 * delete HangDaoTao Request                                                                       
 * @param {*} id                                                                                         
 * @returns                                                                                              
 */                                                                                                      
export const deleteHangDaoTaoRequest = (id) => async (dispatch) => {                               
  try {                                                                                                  
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: true, });              
																										 
    // call delete HangDaoTao                                                                      
    const response = axios.delete(`quantri/hangdt/${id}`);                                           
    const resData = await response;                                                                      
																										 
    if (resData) {                                                                                       
      dispatch({                                                                                       
        type: types.UPDATE_HANGDAOTAO,                                                      
      });                                                    
    }                                                                                                    
																										 
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: false, });             
  } catch (e) {                                                                                          
    console.error(e);                                                                                    
    dispatch({ type: types.SET_LOADING_HANGDAOTAO, hangdaotao: false, });             
  }                                                                                                      
};                                                                                                       
